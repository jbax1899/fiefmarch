import type { MatchState } from "@fiefmarch/game";
import type Phaser from "phaser";

type TerrainGrid = MatchState["board"]["terrain"];
type TerrainKind = NonNullable<TerrainGrid[number][number]>;

const terrainColors: Record<TerrainKind, number> = {
  plains: 0xa2d149,
  "fertile plains": 0x8b4513,
  forest: 0x228b22,
  desert: 0xedc9af,
  mountain: 0x808080,
  gold: 0xffd700,
  ocean: 0x1e90ff,
  lake: 0x1e90ff,
  fish: 0x008080,
};

export function renderBoard(scene: Phaser.Scene, terrain: TerrainGrid, tileSize: number): void {
  for (const [y, row] of terrain.entries()) {
    for (const [x, tile] of row.entries()) {
      const color = tile == null ? 0xff00ff : terrainColors[tile];
      scene.add
        .rectangle(x * tileSize, y * tileSize, tileSize, tileSize, color)
        .setOrigin(0)
        .setStrokeStyle(1, 0x000000);
    }
  }
}
