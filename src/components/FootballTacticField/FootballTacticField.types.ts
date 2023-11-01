import { EPlayerPositionName } from 'footballsimulationengine';
import { IPosition as IPositionMatch } from '../items-tactic-table/types/position.types';
import { IPosition as IPositionUserTeam } from '../items-tactic-table/types/position-user-tema';

export enum EFootballFieldsType {
	MATCH = 'MATCH',
	PREPARE = 'PREPARE'
}

export type TPositionTacticPositionsMatch = Record<
	EPlayerPositionName,
	IPositionMatch
>;
export type TPositionTacticPositionsPrepare = Record<
	EPlayerPositionName,
	IPositionUserTeam
>;

export interface IFootballTacticFieldProps {
	positions: TPositionTacticPositionsMatch | TPositionTacticPositionsPrepare;
	typeField: EFootballFieldsType;
}
