import type { DecodedMap } from "./map.ts";
import type { MatchState, Piece, PlayerState } from "./state.ts";

const startingPieces = [
  { kind: "Keep", idPrefix: "keep" },
  { kind: "Worker", idPrefix: "worker" },
  { kind: "infantry", idPrefix: "infantry" },
] as const;

export function setupGame(
  map: DecodedMap,
  players: readonly PlayerState[],
): Pick<MatchState, "board" | "pieces"> {
  if (map.startingPositions.length !== players.length) {
    throw new Error("Map starting positions must match the number of players");
  }

  const pieces = players.flatMap((player, playerIndex) => {
    const position = map.startingPositions[playerIndex];
    if (!position) throw new Error(`Map is missing starting position ${playerIndex + 1}`);

    return startingPieces.map(({ kind, idPrefix }): Piece => ({
      id: `${idPrefix}:${player.id}`,
      kind,
      ownerId: player.id,
      teamId: player.teamId,
      position: { ...position },
    }));
  });

  return {
    board: { terrain: map.terrain },
    pieces: { pieces },
  };
}
