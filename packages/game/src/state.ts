export type PlayerId = string;
export type TeamId = string;

export type PlayerSetup = {
  id: PlayerId;
  teamId?: TeamId;
};

export type PlayerState = {
  id: PlayerId;
  teamId: TeamId;
  eliminated: boolean;
};

export type TurnState = {
  round: number;
  order: PlayerId[];
  currentIndex: number;
  actionsRemaining: number;
};

export type MatchState = {
  status: 'playing' | 'finished';
  players: PlayerState[];
  turn: TurnState;
  winnerTeamId?: TeamId;
};

export const ACTIONS_PER_TURN = 3;

export function createMatch(setup: readonly PlayerSetup[]): MatchState {
  if (setup.length !== 2 && setup.length !== 4) {
    throw new Error('A match needs two or four players');
  }

  if (setup.some(({ id, teamId }) => !id.trim() || (teamId !== undefined && !teamId.trim()))) {
    throw new Error('Player and team IDs cannot be empty');
  }

  if (new Set(setup.map((player) => player.id)).size !== setup.length) {
    throw new Error('Player IDs must be unique');
  }

  const players = setup.map(({ id, teamId }) => ({
    id,
    teamId: teamId ?? id,
    eliminated: false,
  }));

  if (new Set(players.map((player) => player.teamId)).size < 2) {
    throw new Error('A match needs opposing sides');
  }

  return {
    status: 'playing',
    players,
    turn: {
      round: 1,
      order: players.map((player) => player.id),
      currentIndex: 0,
      actionsRemaining: ACTIONS_PER_TURN,
    },
  };
}
