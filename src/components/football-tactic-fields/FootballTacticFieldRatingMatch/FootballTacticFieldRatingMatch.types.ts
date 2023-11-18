import { IPosition } from '@/components/items-tactic-table/rating-match/types/position.types';
import { EPlayerPositionName } from 'footballsimulationengine';

export type TPositionTacticPositionsRatingMatch = Record<
	EPlayerPositionName,
	IPosition
>;

export interface IFootballTacticFieldRatingMatchProps {
	positions: TPositionTacticPositionsRatingMatch;
}
