import type { Board, Coordinate } from "./map.ts";
import { createMatch, type MatchState, type PlayerId, type PlayerSetup } from "./state.ts";

type Piece = { id: string; ownerId: PlayerId; position: Coordinate; hp: number };
export type BoardMatchState = MatchState & {
  board: Board;
  resources: Record<PlayerId, { food: number; wood: number; stone: number; gold: number }>;
  buildings: (Piece & { type: "keep" })[];
  units: (Piece & { type: "worker" | "infantry" })[];
};

/** Initialize numbered Keeps in setup order. Infantry candidates are ordered by squared
 * distance to the center, then by their clockwise direction relative to the vector from
 * the center to the Keep (cross product), then by y and x. Backtracking chooses the
 * first complete non-overlapping placement in that order. */
export function createBoardMatch(setup: readonly PlayerSetup[], board: Board): BoardMatchState {
  const match = createMatch(setup);
  if (
    !Number.isInteger(board.width) ||
    !Number.isInteger(board.height) ||
    board.width <= 0 ||
    board.height <= 0 ||
    board.tiles.length !== board.height ||
    board.tiles.some((row) => row.length !== board.width)
  ) {
    throw new Error("Invalid board dimensions");
  }
  const keeps = new Map<number, Coordinate>();
  for (let y = 0; y < board.height; y++) {
    for (let x = 0; x < board.width; x++) {
      const tile = board.tiles[y][x];
      if (tile.coordinate.x !== x || tile.coordinate.y !== y)
        throw new Error("Invalid tile coordinate");
      if (tile.startingKeep !== undefined) {
        if (
          !Number.isInteger(tile.startingKeep) ||
          tile.startingKeep < 1 ||
          tile.startingKeep > setup.length ||
          keeps.has(tile.startingKeep) ||
          tile.terrain === "water" ||
          tile.terrain === "mountain"
        )
          throw new Error("Invalid or duplicate starting Keep");
        keeps.set(tile.startingKeep, { x, y });
      }
    }
  }
  if (keeps.size !== setup.length) throw new Error("Starting Keep count must match players");
  const positions = setup.map((_, i) => keeps.get(i + 1)!);
  const key = ({ x, y }: Coordinate) => `${x},${y}`;
  const occupied = new Set(positions.map(key));
  const infantry: Coordinate[] = [];
  const cx = (board.width - 1) / 2;
  const cy = (board.height - 1) / 2;
  function place(i: number): boolean {
    if (i === positions.length) return true;
    const keep = positions[i];
    const candidates = [
      { x: keep.x + 1, y: keep.y },
      { x: keep.x, y: keep.y + 1 },
      { x: keep.x - 1, y: keep.y },
      { x: keep.x, y: keep.y - 1 },
    ].filter(
      ({ x, y }) =>
        x >= 0 &&
        y >= 0 &&
        x < board.width &&
        y < board.height &&
        board.tiles[y][x].terrain !== "water" &&
        board.tiles[y][x].terrain !== "mountain",
    );
    const distance = (p: Coordinate) => (p.x - cx) ** 2 + (p.y - cy) ** 2;
    const cross = (p: Coordinate) =>
      (keep.x - cx) * (p.y - keep.y) - (keep.y - cy) * (p.x - keep.x);
    candidates.sort(
      (a, b) => distance(a) - distance(b) || cross(b) - cross(a) || a.y - b.y || a.x - b.x,
    );
    for (const candidate of candidates) {
      const k = key(candidate);
      if (occupied.has(k)) continue;
      occupied.add(k);
      infantry.push(candidate);
      if (place(i + 1)) return true;
      infantry.pop();
      occupied.delete(k);
    }
    return false;
  }
  if (!place(0)) throw new Error("No legal Infantry placement for starting Keeps");
  return {
    ...match,
    board: {
      ...board,
      tiles: board.tiles.map((row) =>
        row.map((tile) => ({ ...tile, coordinate: { ...tile.coordinate } })),
      ),
    },
    resources: Object.fromEntries(
      setup.map(({ id }) => [id, { food: 2, wood: 2, stone: 0, gold: 0 }]),
    ),
    buildings: setup.map(({ id }, i) => ({
      id: `keep-${i + 1}`,
      type: "keep",
      ownerId: id,
      position: { ...positions[i] },
      hp: 3,
    })),
    units: setup.flatMap(({ id }, i) => [
      {
        id: `worker-${i + 1}`,
        type: "worker" as const,
        ownerId: id,
        position: { ...positions[i] },
        hp: 1,
      },
      {
        id: `infantry-${i + 1}`,
        type: "infantry" as const,
        ownerId: id,
        position: { ...infantry[i] },
        hp: 3,
      },
    ]),
  };
}
