import { expect, test } from "bun:test";
import { createApp } from "../src/app";
import { createServer } from "../src/server";

test("health endpoint returns an OK status", async () => {
  const { app } = createApp();
  const response = await app.request("/healthz");

  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ status: "ok" });
});

test("WebSocket connections receive readiness and close cleanly", async () => {
  const { server, connections } = createServer({ hostname: "127.0.0.1", port: 0 });
  const endpoint = new URL("/ws", server.url);
  endpoint.protocol = "ws:";
  const socket = new WebSocket(endpoint);

  try {
    const opened = new Promise<void>((resolve, reject) => {
      socket.addEventListener("open", () => resolve(), { once: true });
      socket.addEventListener("error", () => reject(new Error("WebSocket connection failed")), {
        once: true,
      });
    });
    const message = new Promise<MessageEvent>((resolve) => {
      socket.addEventListener("message", (event) => resolve(event), { once: true });
    });

    await opened;
    expect((await message).data).toBe('{"type":"connected"}');

    const closed = new Promise<CloseEvent>((resolve) => {
      socket.addEventListener("close", (event) => resolve(event), { once: true });
    });
    socket.close(1000, "smoke test complete");

    expect((await closed).code).toBe(1000);
    expect(connections.size).toBe(0);
  } finally {
    if (socket.readyState === WebSocket.OPEN) {
      socket.close();
    }

    await server.stop(true);
  }
});

test("WebSocket upgrades reject origins outside the allowlist", async () => {
  const { app } = createApp({ allowedOrigins: ["http://localhost:5173"] });
  const response = await app.request("/ws", {
    headers: { origin: "https://untrusted.example" },
  });

  expect(response.status).toBe(403);
});
