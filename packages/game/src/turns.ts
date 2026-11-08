import { ACTIONS_PER_TURN, type MatchState, type PlayerId } from "./state.ts";

export type CommandResult =
  | { ok: true; state: MatchState }
  | { ok: false; state: MatchState; reason: string };

export function advanceTurn(state: MatchState): MatchState {
  const { order, currentIndex } = state.turn;
  let index = currentIndex;
  let round = state.turn.round;

  do {
    index = (index + 1) % order.length;
    if (index === 0) round++;
  } while (state.players.find((player) => player.id === order[index])?.eliminated);

  return {
    ...state,
    turn: { ...state.turn, currentIndex: index, round, actionsRemaining: ACTIONS_PER_TURN },
  };
}

export function useAction(state: MatchState, playerId: PlayerId): CommandResult {
  if (state.status !== "playing") return { ok: false, state, reason: "Match has finished" };
  if (state.turn.order[state.turn.currentIndex] !== playerId) {
    return { ok: false, state, reason: "Not your turn" };
  }

  if (state.turn.actionsRemaining === 1) return { ok: true, state: advanceTurn(state) };
  return {
    ok: true,
    state: { ...state, turn: { ...state.turn, actionsRemaining: state.turn.actionsRemaining - 1 } },
  };
}

export function endTurn(state: MatchState, playerId: PlayerId): CommandResult {
  if (state.status !== "playing") return { ok: false, state, reason: "Match has finished" };
  if (state.turn.order[state.turn.currentIndex] !== playerId) {
    return { ok: false, state, reason: "Not your turn" };
  }
  return { ok: true, state: advanceTurn(state) };
}
