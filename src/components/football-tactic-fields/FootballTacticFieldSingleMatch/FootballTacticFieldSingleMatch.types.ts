import { IPosition } from '@/components/items-tactic-table/single-match/types/position.types';
import { EPlayerPositionName } from 'footballsimulationengine';

export type TPositionTacticPositionsSingleMatch = Record<
	EPlayerPositionName,
	IPosition
>;

export interface IFootballTacticFieldSingleMatchProps {
	positions: TPositionTacticPositionsSingleMatch;
}
