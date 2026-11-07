import { websocket } from "@hono/bun";
import { createApp } from "./app";

type ServerOptions = {
  allowedOrigins?: readonly string[];
  hostname?: string;
  maxConnections?: number;
  port?: number;
};

function validatePort(port: number): number {
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error("PORT must be an integer between 0 and 65535");
  }

  return port;
}

function readPort(value: string | undefined): number {
  if (value === undefined || value.trim() === "") {
    return 3000;
  }

  return validatePort(Number(value));
}

export function createServer(options: ServerOptions = {}) {
  const { app, connections } = createApp(options);
  const server = Bun.serve({
    hostname: options.hostname ?? (Bun.env.HOST?.trim() || "0.0.0.0"),
    port: options.port === undefined ? readPort(Bun.env.PORT) : validatePort(options.port),
    fetch: app.fetch,
    websocket: {
      ...websocket,
      idleTimeout: 60,
      maxPayloadLength: 1024,
    },
  });

  let stopPromise: Promise<void> | undefined;

  const stop = (): Promise<void> => {
    if (stopPromise) {
      return stopPromise;
    }

    stopPromise = (async () => {
      for (const socket of connections.values()) {
        socket.close(1001, "Server is shutting down");
      }

      let forceStopTimer: ReturnType<typeof setTimeout> | undefined;

      try {
        await Promise.race([
          server.stop(),
          new Promise<void>((resolve) => {
            forceStopTimer = setTimeout(() => {
              void server.stop(true).then(resolve);
            }, 5_000);
          }),
        ]);
      } finally {
        if (forceStopTimer) {
          clearTimeout(forceStopTimer);
        }
      }
    })();

    return stopPromise;
  };

  return { server, connections, stop };
}
