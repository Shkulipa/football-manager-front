import { EPlayerPositionName } from '@/constants/player-position-name.enum';
import { IPlayer } from 'footballsimulationengine';

export interface IPosition {
	position: EPlayerPositionName;
	coordinates: [number, number];
	currentPlayer: IPlayer | null;
}
