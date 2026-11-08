import type { MatchState, PlayerId } from './state.ts';
import { advanceTurn, endTurn, type CommandResult } from './turns.ts';

export type GameCommand = { type: 'end-turn' } | { type: 'resign' };

export function applyCommand(
  state: MatchState,
  playerId: PlayerId,
  command: GameCommand,
): CommandResult {
  if (state.status !== 'playing') return { ok: false, state, reason: 'Match has finished' };
  if (command.type === 'end-turn') return endTurn(state, playerId);

  const player = state.players.find(({ id }) => id === playerId);
  if (!player || player.eliminated) {
    return { ok: false, state, reason: 'Player is not in the match' };
  }

  const players = state.players.map((entry) =>
    entry.id === playerId ? { ...entry, eliminated: true } : entry,
  );
  const remainingTeams = new Set(players.filter((entry) => !entry.eliminated).map((entry) => entry.teamId));
  const updated = { ...state, players };

  if (remainingTeams.size === 1) {
    return {
      ok: true,
      state: { ...updated, status: 'finished', winnerTeamId: [...remainingTeams][0] },
    };
  }

  if (state.turn.order[state.turn.currentIndex] === playerId) {
    return { ok: true, state: advanceTurn(updated) };
  }
  return { ok: true, state: updated };
}
