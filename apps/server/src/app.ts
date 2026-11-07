import { upgradeWebSocket } from "@hono/bun";
import { Hono } from "hono";

type TrackedSocket = {
  raw?: unknown;
  close(code?: number, reason?: string): void;
  send(message: string): void;
};

type AppOptions = {
  allowedOrigins?: readonly string[];
  maxConnections?: number;
};

export function createApp(options: AppOptions = {}) {
  const allowedOrigins = new Set(
    options.allowedOrigins ??
      (Bun.env.ALLOWED_ORIGINS ?? "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
  );
  const maxConnections = options.maxConnections ?? 64;
  const connections = new Map<unknown, TrackedSocket>();
  const app = new Hono();

  app.get("/healthz", (context) => context.json({ status: "ok" }));

  app.use("/ws", async (context, next) => {
    const origin = context.req.header("origin");

    if (origin && !allowedOrigins.has(origin)) {
      return context.json({ error: "origin_not_allowed" }, 403);
    }

    if (connections.size >= maxConnections) {
      return context.json({ error: "connection_limit_reached" }, 503);
    }

    return await next();
  });

  app.get(
    "/ws",
    upgradeWebSocket(() => ({
      onOpen(_event, socket) {
        if (connections.size >= maxConnections) {
          socket.close(1013, "Server is at capacity");
          return;
        }

        connections.set(socket.raw ?? socket, socket);
        socket.send(JSON.stringify({ type: "connected" }));
      },
      onMessage(_event, socket) {
        socket.close(1008, "Application messages are not enabled");
      },
      onClose(_event, socket) {
        connections.delete(socket.raw ?? socket);
      },
    })),
  );

  return { app, connections };
}
