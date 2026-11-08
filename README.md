# Fiefmarch

Fiefmarch is a browser-based medieval strategy game. The repository has a bare Phaser client and a Bun/Hono server.

## Game design

- [Game design](docs/game-design.md) — overview.
- [Rules](docs/rules.md) — gameplay and combat.
- [Maps](docs/maps.md) — terrain, symmetry, and resources.
- [Edicts](docs/edicts.md) — special actions.

## Development

Requires Node.js 22.12+, pnpm 10.26.2, and Bun 1.4.4.

```sh
pnpm install
pnpm dev:client
pnpm dev:server
```

Run the client and server in separate terminals. Vite prints the client URL; the server defaults to `http://localhost:3000`.

Use `HOST` and `PORT` to change the server address. `ALLOWED_ORIGINS` lists permitted WebSocket browser origins, separated by commas. Health checks use `GET /healthz`; WebSocket connections use `/ws`.

With the server running, `pnpm smoke:server` checks health and WebSocket connections. Repository checks: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build`. Run `pnpm format` to format files.

## Workspace

- `apps/client` — Phaser 4 and Vite, with an empty scene.
- `apps/server` — Bun and Hono HTTP/WebSocket server.

## Docker

Build and run the backend with a 256 MB memory limit:

```sh
docker build -f apps/server/Dockerfile -t fiefmarch-server .
docker run --rm --memory=256m --memory-swap=256m -p 3000:8080 fiefmarch-server
```

Run `pnpm smoke:server` in another terminal to check the container.

## Fly.io

`fly.toml` configures a shared-vCPU, 256 MB Machine in `ord`, with HTTPS and a health check. GitHub Actions deploys the backend when checks pass on the current `main` commit. Pull requests run checks without deploying. For a manual redeploy, run the `CI` workflow from `main`.

Create a deployment token scoped to the `fiefmarch` app:

```sh
fly tokens create deploy --app fiefmarch --expiry 8760h --name github-actions-fiefmarch
```

Store the token as `FLY_API_TOKEN` in GitHub's `production` environment, restricted to `main`. Never commit it. The deployed backend health endpoint is `https://fiefmarch.fly.dev/healthz`. The Phaser client is not deployed.

## Licensing

Fiefmarch's original source code uses the [PolyForm Noncommercial License 1.0.0](LICENSE.md), which permits noncommercial use, modification, and redistribution under its terms. Commercial use requires separate permission from the relevant rights holders. This license is source-available, not OSI-approved open source.

Original artwork, music, branding, and design documents are not automatically covered. Third-party materials keep their own licenses.
