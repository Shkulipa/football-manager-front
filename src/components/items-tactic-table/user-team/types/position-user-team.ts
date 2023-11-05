import { IRealPlayer } from '@/types/football-simulator/real-player';
import {
	EPlayerPositionName,
	IRealPlayerNotMain
} from 'footballsimulationengine';
import { ETypeDragTactics } from '../../constants/type-drag-drop';

export interface IDropResultData {
	position: EPlayerPositionName;
	coordinates: [number, number];
	player: IRealPlayer;
}

export interface IPosition
	extends Pick<IDropResultData, 'coordinates' | 'position'> {
	player: IRealPlayer | null;
}

export interface IDropResult {
	data: IDropResultData | IRealPlayerNotMain;
	type: ETypeDragTactics;
}
