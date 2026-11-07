# Fiefmarch

Fiefmarch is a browser-based strategy game in early development. For now, this repository contains a blank Phaser client and a small Bun/Hono backend.

## Game design

The [design notes](docs/game-design.md) explain what we're aiming for, and the [working rules](docs/rules.md) record our current decisions and trial values. Both are drafts; several mechanics are deliberately unresolved.

## Development

You'll need Node.js 22.12 or newer, pnpm 10.26.2, and Bun 1.4.4.

```sh
pnpm install
pnpm dev:client
pnpm dev:server
```

Run the two development commands in separate terminals. Vite prints the client URL, and the server listens at `http://localhost:3000` by default.

Use `HOST` and `PORT` to change the server's listening address. Set `ALLOWED_ORIGINS` to a comma-separated list of browser origins permitted to connect over WebSocket. The server exposes `GET /healthz` for health checks and `/ws` for WebSocket connections.

With the server running, `pnpm smoke:server` checks the health endpoint and WebSocket connection lifecycle. To check the repository, run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. Use `pnpm format` to apply formatting.

## Workspace

- `apps/client` — Phaser 4 and Vite, with an empty scene.
- `apps/server` — Bun and Hono HTTP/WebSocket server.

## Docker

Build the backend image and run it with a 256 MB memory limit:

```sh
docker build -f apps/server/Dockerfile -t fiefmarch-server .
docker run --rm --memory=256m --memory-swap=256m -p 3000:8080 fiefmarch-server
```

In another terminal, run `pnpm smoke:server` to check the container.

## Fly.io

`fly.toml` configures one shared-vCPU, 256 MB Machine in `ord`, with HTTPS and an HTTP health check. GitHub Actions deploys the backend after checks pass on `main`, provided the commit is still current. Pull requests run checks but do not deploy. To redeploy manually, run the `CI` workflow from `main` in GitHub Actions.

To set up deployment credentials, create a token scoped to the `fiefmarch` app:

```sh
fly tokens create deploy --app fiefmarch --expiry 8760h --name github-actions-fiefmarch
```

Store the token as `FLY_API_TOKEN` in the GitHub `production` environment, restricted to `main`. Don't commit the token. Once deployed, the backend health endpoint is at `https://fiefmarch.fly.dev/healthz`. The Phaser client isn't deployed.

## Licensing

Fiefmarch's original source code is available under the [PolyForm Noncommercial License 1.0.0](LICENSE.md). The license permits noncommercial use, modification, and redistribution under its terms. Commercial use requires separate permission from the relevant rights holders. This is a source-available license, not an OSI-approved open-source license.

The license doesn't automatically cover original artwork, music, branding, or design documents. Third-party materials retain their own licenses.
