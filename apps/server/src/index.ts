import { createServer } from "./server";

function main(): void {
  const { server, stop } = createServer();
  let shutdownPromise: Promise<void> | undefined;

  console.info(`Fiefmarch server listening at ${server.url}`);

  const shutdown = (signal: string): Promise<void> => {
    if (shutdownPromise) {
      return shutdownPromise;
    }

    console.info(`Received ${signal}; closing connections`);

    shutdownPromise = stop().then(() => {
      console.info("Fiefmarch server stopped");
    });

    return shutdownPromise;
  };

  process.once("SIGINT", () => void shutdown("SIGINT"));
  process.once("SIGTERM", () => void shutdown("SIGTERM"));
}

if (import.meta.main) {
  main();
}
