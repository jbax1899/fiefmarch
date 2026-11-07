const baseUrl = new URL(Bun.env.SMOKE_BASE_URL ?? `http://127.0.0.1:${Bun.env.PORT ?? "3000"}`);
const response = await fetch(new URL("/healthz", baseUrl), {
  signal: AbortSignal.timeout(5_000),
});

if (!response.ok) {
  throw new Error(`Health check failed with HTTP ${response.status}`);
}

const websocketUrl = new URL("/ws", baseUrl);
websocketUrl.protocol = websocketUrl.protocol === "https:" ? "wss:" : "ws:";

const socket = new WebSocket(websocketUrl);
let readinessReceived = false;
let failed = false;

const timeout = setTimeout(() => {
  failed = true;
  process.exitCode = 1;
  console.error("Timed out waiting for WebSocket lifecycle");

  if (socket.readyState === WebSocket.OPEN) {
    socket.close(1011, "smoke test timeout");
  }
}, 15_000);

socket.addEventListener("open", () => {
  const closeWhenReady = (): void => {
    if (socket.readyState !== WebSocket.OPEN || failed) {
      return;
    }

    if (readinessReceived) {
      socket.close(1000, "smoke test complete");
      return;
    }

    setTimeout(closeWhenReady, 50);
  };

  setTimeout(closeWhenReady, 50);
});

socket.addEventListener("message", (event) => {
  if (event.data !== '{"type":"connected"}') {
    failed = true;
    process.exitCode = 1;
    console.error("Unexpected WebSocket readiness message");
    socket.close(1008, "unexpected readiness message");
    return;
  }

  readinessReceived = true;
});

socket.addEventListener("close", (event) => {
  clearTimeout(timeout);

  if (!readinessReceived || event.code !== 1000) {
    process.exitCode = 1;
    console.error(`WebSocket closed unexpectedly with code ${event.code}`);
    return;
  }

  console.info(`Health and WebSocket smoke checks passed for ${baseUrl.origin}`);
});

socket.addEventListener("error", () => {
  clearTimeout(timeout);
  process.exitCode = 1;
  console.error("WebSocket smoke check failed");
});

export {};
