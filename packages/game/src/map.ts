/** Coordinates are zero-based, with x increasing right and y increasing down. */
export type Coordinate = { x: number; y: number };
export type Terrain = "plains" | "forest" | "desert" | "mountain" | "water";
export type Resource = "food" | "wood" | "stone" | "gold";
export type Tile = {
  coordinate: Coordinate;
  terrain: Terrain;
  resource?: Resource;
  startingKeep?: number;
};
export type Board = { width: number; height: number; tiles: Tile[][] };

/** Parse the existing JSON map object. Resource and Keep symbols include their underlying terrain. */
export function loadMap(input: unknown): Board {
  if (typeof input !== "object" || input === null || !("terrain" in input)) {
    throw new Error("Map must contain terrain rows");
  }
  const rows = input.terrain;
  if (!Array.isArray(rows) || rows.length === 0 || rows.some((row) => typeof row !== "string")) {
    throw new Error("Terrain must be a non-empty array of strings");
  }
  const width = rows[0].length;
  if (width === 0 || rows.some((row: string) => row.length !== width)) {
    throw new Error("Terrain rows must be non-empty and rectangular");
  }

  const keeps = new Set<number>();
  const tiles: Tile[][] = rows.map((row: string, y: number) =>
    Array.from(row, (symbol, x): Tile => {
      const coordinate = { x, y };
      switch (symbol) {
        case ".":
          return { coordinate, terrain: "plains" };
        case "f":
          return { coordinate, terrain: "forest", resource: "wood" };
        case "d":
          return { coordinate, terrain: "desert" };
        case "m":
          return { coordinate, terrain: "mountain", resource: "stone" };
        case "~":
          return { coordinate, terrain: "water" };
        case "F":
          return { coordinate, terrain: "plains", resource: "food" };
        case "G":
          return { coordinate, terrain: "plains", resource: "gold" };
        case "H":
          return { coordinate, terrain: "water", resource: "food" };
        case "1":
        case "2":
        case "3":
        case "4": {
          const startingKeep = Number(symbol);
          if (keeps.has(startingKeep)) throw new Error(`Duplicate starting Keep: ${symbol}`);
          keeps.add(startingKeep);
          return { coordinate, terrain: "plains", startingKeep };
        }
        default:
          throw new Error(`Unknown terrain character ${JSON.stringify(symbol)} at (${x}, ${y})`);
      }
    }),
  );
  if (keeps.size === 0 || [...keeps].some((keep) => keep > keeps.size)) {
    throw new Error("Starting Keeps must be numbered consecutively from 1");
  }
  return { width, height: rows.length, tiles };
}
