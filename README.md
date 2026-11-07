# Fiefmarch

A web-based chess-like game.

## Development

Requirements: Node.js 22.12+, pnpm 10.26.2, and Bun 1.4.4.

```sh
pnpm install
pnpm dev:client
pnpm dev:server
```

Run the client and server commands in separate terminals. Vite prints the client URL; the backend listens on `http://localhost:3000` by default. Set `HOST` and `PORT` to configure the backend listener. `GET /healthz` reports server health, and `GET /ws` accepts WebSocket connections. Set `ALLOWED_ORIGINS` to a comma-separated list when browser clients need to connect.

`pnpm smoke:server` checks the health route and WebSocket connect/close lifecycle against a running backend. Run `pnpm format`, `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` for project checks.

## Workspace

- `apps/client` — Phaser 4 and Vite browser app with an empty responsive scene.
- `apps/server` — Bun and Hono HTTP/WebSocket backend.

## Docker

Build and run the backend with a 256 MB memory limit:

```sh
docker build -f apps/server/Dockerfile -t fiefmarch-server .
docker run --rm --memory=256m --memory-swap=256m -p 3000:8080 fiefmarch-server
```

In another terminal, run `pnpm smoke:server` to check the container.

## Fly.io

The root `fly.toml` configures the backend for `ord`, one shared CPU, 256 MB memory, HTTPS, and an HTTP health check. Authenticate with Fly, create the app once under the personal organization, then deploy the backend image:

```sh
fly auth login
fly apps create fiefmarch --org personal
fly deploy --remote-only --ha=false
```

The backend health endpoint is `https://fiefmarch.fly.dev/healthz`. The Phaser client is not part of this deployment.

## Licensing

Fiefmarch's original source code is available under the [PolyForm Noncommercial License 1.0.0](LICENSE.md). The license permits noncommercial use, modification, and redistribution under its terms. Commercial use requires separate permission from the relevant rights holders.

PolyForm Noncommercial is a **source-available license**, not an OSI-approved open-source license.

This license applies to the original software source code only. Original game artwork, music, branding, and design documents are not automatically licensed under PolyForm Noncommercial. Third-party materials retain their respective licenses.
