import { expect, test } from "bun:test";
import { createServer } from "../src/server";

const ALLOWED_ORIGIN = "https://fiefmarch.example";
type TestServer = ReturnType<typeof createServer>["server"];

function createSocket(server: TestServer, origin?: string): WebSocket {
  const url = new URL("/ws", server.url);
  url.protocol = "ws:";

  return origin ? new WebSocket(url, { headers: { origin } }) : new WebSocket(url);
}

function waitForOpen(socket: WebSocket): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Timed out waiting for open")), 3_000);
    socket.addEventListener(
      "open",
      () => {
        clearTimeout(timeout);
        resolve();
      },
      { once: true },
    );
    socket.addEventListener(
      "error",
      () => {
        clearTimeout(timeout);
        reject(new Error("WebSocket connection failed"));
      },
      { once: true },
    );
  });
}

function waitForMessage(socket: WebSocket): Promise<MessageEvent> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Timed out waiting for message")), 3_000);
    socket.addEventListener(
      "message",
      (event) => {
        clearTimeout(timeout);
        resolve(event);
      },
      { once: true },
    );
    socket.addEventListener(
      "error",
      () => {
        clearTimeout(timeout);
        reject(new Error("WebSocket failed before sending a message"));
      },
      { once: true },
    );
  });
}

function waitForClose(socket: WebSocket): Promise<CloseEvent> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Timed out waiting for close")), 3_000);
    socket.addEventListener(
      "close",
      (event) => {
        clearTimeout(timeout);
        resolve(event);
      },
      { once: true },
    );
  });
}

function waitForHandshakeRejection(socket: WebSocket): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Timed out waiting for rejected upgrade")),
      3_000,
    );
    socket.addEventListener(
      "error",
      () => {
        clearTimeout(timeout);
        resolve();
      },
      { once: true },
    );
    socket.addEventListener(
      "open",
      () => {
        clearTimeout(timeout);
        reject(new Error("WebSocket upgrade unexpectedly succeeded"));
      },
      { once: true },
    );
  });
}

async function expectReady(socket: WebSocket): Promise<void> {
  const [, message] = await Promise.all([waitForOpen(socket), waitForMessage(socket)]);
  expect(message.data).toBe('{"type":"connected"}');
}

test("serves health over HTTP", async () => {
  const { server, stop } = createServer({ hostname: "127.0.0.1", port: 0 });

  try {
    const response = await fetch(new URL("/healthz", server.url));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ok" });
  } finally {
    await stop();
  }
});

test("accepts allowlisted WebSocket origins", async () => {
  const { server, connections, stop } = createServer({
    hostname: "127.0.0.1",
    port: 0,
    allowedOrigins: [ALLOWED_ORIGIN],
  });
  const socket = createSocket(server, ALLOWED_ORIGIN);

  try {
    await expectReady(socket);
    expect(connections.size).toBe(1);

    const closed = waitForClose(socket);
    socket.close(1000, "test complete");
    expect((await closed).code).toBe(1000);
    expect(connections.size).toBe(0);
  } finally {
    if (socket.readyState === WebSocket.OPEN) {
      socket.close();
    }

    await stop();
  }
});

test("rejects WebSocket origins outside the allowlist", async () => {
  const { server, connections, stop } = createServer({
    hostname: "127.0.0.1",
    port: 0,
    allowedOrigins: [ALLOWED_ORIGIN],
  });
  const socket = createSocket(server, "https://untrusted.example");

  try {
    await waitForHandshakeRejection(socket);
    expect(connections.size).toBe(0);
  } finally {
    await stop();
  }
});

test("enforces the connection limit and frees a slot after close", async () => {
  const { server, connections, stop } = createServer({
    hostname: "127.0.0.1",
    port: 0,
    allowedOrigins: [ALLOWED_ORIGIN],
    maxConnections: 1,
  });
  const first = createSocket(server, ALLOWED_ORIGIN);
  const rejected = createSocket(server, ALLOWED_ORIGIN);
  let next: WebSocket | undefined;

  try {
    await expectReady(first);
    expect(connections.size).toBe(1);
    await waitForHandshakeRejection(rejected);
    expect(connections.size).toBe(1);

    const firstClosed = waitForClose(first);
    first.close(1000, "free connection slot");
    expect((await firstClosed).code).toBe(1000);
    expect(connections.size).toBe(0);

    next = createSocket(server, ALLOWED_ORIGIN);
    await expectReady(next);
    expect(connections.size).toBe(1);
  } finally {
    if (first.readyState === WebSocket.OPEN) {
      first.close();
    }
    if (next?.readyState === WebSocket.OPEN) {
      next.close();
    }

    await stop();
  }
});

test("closes unsupported application messages without echoing them", async () => {
  const { server, stop } = createServer({ hostname: "127.0.0.1", port: 0 });
  const socket = createSocket(server);
  const received: string[] = [];

  try {
    await expectReady(socket);
    socket.addEventListener("message", (event) => received.push(String(event.data)));

    const closed = waitForClose(socket);
    socket.send("unsupported");

    const event = await closed;
    expect(event.code).toBe(1008);
    expect(event.reason).toBe("Application messages are not enabled");
    expect(received).toEqual([]);
  } finally {
    if (socket.readyState === WebSocket.OPEN) {
      socket.close();
    }

    await stop();
  }
});

test("rejects oversized WebSocket messages", async () => {
  const { server, stop } = createServer({ hostname: "127.0.0.1", port: 0 });
  const socket = createSocket(server);

  try {
    await expectReady(socket);

    const closed = waitForClose(socket);
    socket.send("x".repeat(1025));

    expect((await closed).code).toBe(1009);
  } finally {
    if (socket.readyState === WebSocket.OPEN) {
      socket.close();
    }

    await stop();
  }
});

test("graceful shutdown closes active WebSockets with going-away", async () => {
  const { server, connections, stop } = createServer({ hostname: "127.0.0.1", port: 0 });
  const socket = createSocket(server);

  try {
    await expectReady(socket);
    expect(connections.size).toBe(1);
    const closed = waitForClose(socket);

    await stop();

    const event = await closed;
    expect(event.code).toBe(1001);
    expect(event.reason).toBe("Server is shutting down");
    expect(connections.size).toBe(0);
  } finally {
    if (socket.readyState === WebSocket.OPEN) {
      socket.close();
    }

    await stop();
  }
});

test("rejects invalid port configuration before binding", () => {
  expect(() => createServer({ port: 65536 })).toThrow(
    "PORT must be an integer between 0 and 65535",
  );
});
