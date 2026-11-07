FROM node:22-bookworm-slim AS dependencies

WORKDIR /workspace

RUN npm install --global pnpm@10.26.2

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY LICENSE.md ./LICENSE.md
COPY apps/client/package.json ./apps/client/package.json
COPY apps/server/package.json ./apps/server/package.json

RUN pnpm install --filter @fiefmarch/server --prod --frozen-lockfile

FROM oven/bun:1.4.4-slim AS build

WORKDIR /workspace

COPY --from=dependencies /workspace/node_modules ./node_modules
COPY --from=dependencies /workspace/apps/server/node_modules ./apps/server/node_modules
COPY apps/server/package.json ./apps/server/package.json

COPY apps/server/src ./apps/server/src
RUN mkdir -p /out \
  && bun build apps/server/src/index.ts --target=bun --minify --outfile=/out/server.js

FROM oven/bun:1.4.4-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=8080

COPY --from=build --chown=bun:bun /out/server.js ./server.js
COPY --from=dependencies --chown=bun:bun /workspace/LICENSE.md ./LICENSE.md

USER bun
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD ["bun", "-e", "fetch('http://127.0.0.1:' + (process.env.PORT || 8080) + '/healthz').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"]
CMD ["bun", "run", "server.js"]
