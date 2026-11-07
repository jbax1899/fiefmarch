import { createServer } from "./server";

async function main(): Promise<void> {
  const { server, connections } = createServer();
  let shutdownPromise: Promise<void> | undefined;

  console.info(`Fiefmarch server listening at ${server.url}`);

  const shutdown = (signal: string): Promise<void> => {
    if (shutdownPromise) {
      return shutdownPromise;
    }

    console.info(`Received ${signal}; closing connections`);

    shutdownPromise = (async () => {
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

      console.info("Fiefmarch server stopped");
    })();

    return shutdownPromise;
  };

  process.once("SIGINT", () => void shutdown("SIGINT"));
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
}

if (import.meta.main) {
  void main();
}
