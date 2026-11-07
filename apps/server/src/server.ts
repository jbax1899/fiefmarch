import { websocket } from "@hono/bun";
import { createApp } from "./app";

type ServerOptions = {
  allowedOrigins?: readonly string[];
  hostname?: string;
  maxConnections?: number;
  port?: number;
};

function readPort(value: string | undefined): number {
  if (value === undefined || value.trim() === "") {
    return 3000;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error("PORT must be an integer between 0 and 65535");
  }

  return port;
}

export function createServer(options: ServerOptions = {}) {
  const { app, connections } = createApp(options);
  const server = Bun.serve({
    hostname: options.hostname ?? (Bun.env.HOST?.trim() || "0.0.0.0"),
    port: options.port ?? readPort(Bun.env.PORT),
    fetch: app.fetch,
    websocket: {
      ...websocket,
      idleTimeout: 60,
      maxPayloadLength: 1024,
    },
  });

  return { server, connections };
}
