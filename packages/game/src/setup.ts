import type { DecodedMap } from "./map.ts";
import type { MatchState, Piece, PlayerState } from "./state.ts";

export function setupGame(
  map: DecodedMap,
  players: readonly PlayerState[],
): Pick<MatchState, "board" | "pieces"> {
  if (map.startingPositions.length !== players.length) {
    throw new Error("Map starting positions must match the number of players");
  }

  const keeps = players.map((player, playerIndex): Piece => {
    const position = map.startingPositions[playerIndex];
    if (!position) throw new Error(`Map is missing starting position ${playerIndex + 1}`);

    return {
      id: `keep:${player.id}`,
      kind: "Keep",
      ownerId: player.id,
      teamId: player.teamId,
      position: { ...position },
    };
  });

  return {
    board: { terrain: map.terrain },
    pieces: { pieces: keeps },
  };
}
