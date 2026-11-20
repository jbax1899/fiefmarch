import type { TerrainKind } from "./terrain.ts";

export type MapDefinition = {
  terrain: readonly string[];
};

export type DecodedMap = {
  terrain: TerrainKind[][];
  startingPositions: { x: number; y: number }[];
};

export function decodeMap({ terrain }: MapDefinition): DecodedMap {
  const map: TerrainKind[][] = terrain.map(() => []);
  const startingPositions: { x: number; y: number }[] = [];

  for (let y = 0; y < terrain.length; y++) {
    for (let x = 0; x < terrain[y].length; x++) {
      switch (terrain[y][x]) {
        case "1":
          startingPositions[0] = { x: x, y: y };
          map[y][x] = "plains";
          break;
        case "2":
          startingPositions[1] = { x: x, y: y };
          map[y][x] = "plains";
          break;
        case "3":
          startingPositions[2] = { x: x, y: y };
          map[y][x] = "plains";
          break;
        case "4":
          startingPositions[3] = { x: x, y: y };
          map[y][x] = "plains";
          break;
        case ".":
          map[y][x] = "plains";
          break;
        case "f":
          map[y][x] = "forest";
          break;
        case "d":
          map[y][x] = "desert";
          break;
        case "m":
          map[y][x] = "mountain";
          break;
        case "~":
          map[y][x] = "ocean";
          break;
        case "F":
          map[y][x] = "fertile plains";
          break;
        case "G":
          map[y][x] = "gold";
          break;
        case "H":
          map[y][x] = "fish";
          break;
        default:
          map[y][x] = undefined;
          break;
      }
    }
  }

  return { terrain: map, startingPositions };
}
