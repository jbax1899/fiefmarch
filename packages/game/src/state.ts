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
  status: "playing" | "finished";
  players: PlayerState[];
  turn: TurnState;
  winnerTeamId?: TeamId;
};

export const ACTIONS_PER_TURN = 3;

export function createMatch(setup: readonly PlayerSetup[]): MatchState {
  if (setup.length !== 2 && setup.length !== 4) {
    throw new Error("A match needs two or four players");
  }

  if (setup.some(({ id, teamId }) => !id.trim() || (teamId !== undefined && !teamId.trim()))) {
    throw new Error("Player and team IDs cannot be empty");
  }

  if (new Set(setup.map((player) => player.id)).size !== setup.length) {
    throw new Error("Player IDs must be unique");
  }

  const players = setup.map(({ id, teamId }) => ({
    id,
    teamId: teamId ?? id,
    eliminated: false,
  }));

  const teamIds = [...new Set(players.map((player) => player.teamId))];
  const isFreeForAll = teamIds.length === players.length;
  const isTwoVersusTwo =
    players.length === 4 &&
    teamIds.length === 2 &&
    teamIds.every((teamId) => players.filter((player) => player.teamId === teamId).length === 2);

  if (!isFreeForAll && !isTwoVersusTwo) {
    throw new Error("Unsupported team setup");
  }

  let order = players.map((player) => player.id);
  if (isTwoVersusTwo) {
    const firstTeam = players.filter((player) => player.teamId === teamIds[0]);
    const secondTeam = players.filter((player) => player.teamId === teamIds[1]);
    order = [firstTeam[0].id, secondTeam[0].id, firstTeam[1].id, secondTeam[1].id];
  }

  return {
    status: "playing",
    players,
    turn: {
      round: 1,
      order,
      currentIndex: 0,
      actionsRemaining: ACTIONS_PER_TURN,
    },
  };
}
