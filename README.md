# Fiefmarch

A web-based chess-like game.

## Getting started

Install Node.js 22.12 or newer and pnpm 10.26.2, then install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

The game opens at the local URL printed by Vite. Use `pnpm typecheck`, `pnpm lint`, and `pnpm build` to check the project and create a production build in `dist/`. Run `pnpm format` to format the source.

The browser app starts in `src/main.ts`. Phaser initialization and configuration live in `src/game/`, with scenes in `src/game/scenes/`. Keep future game rules independent of Phaser scenes and rendering.

## Licensing

Fiefmarch's original source code is available under the [PolyForm Noncommercial License 1.0.0](LICENSE.md). The license permits noncommercial use, modification, and redistribution under its terms. Commercial use requires separate permission from the relevant rights holders.

PolyForm Noncommercial is a **source-available license**, not an OSI-approved open-source license.

This license applies to the original software source code only. Original game artwork, music, branding, and design documents are not automatically licensed under PolyForm Noncommercial. Third-party materials retain their respective licenses.
