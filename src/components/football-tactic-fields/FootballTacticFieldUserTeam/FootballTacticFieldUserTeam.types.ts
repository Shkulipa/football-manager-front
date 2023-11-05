import { IPosition } from '@/components/items-tactic-table/user-team/types/position-user-team';
import { EPlayerPositionName } from 'footballsimulationengine';

export type TPositionTacticPositionsUserTeam = Record<
	EPlayerPositionName,
	IPosition
>;

export interface IFootballTacticFieldUserTeamProps {
	positions: TPositionTacticPositionsUserTeam;
}
