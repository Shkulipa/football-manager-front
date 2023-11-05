import {
	EPlayerPositionName,
	IPlayer,
	IRealPlayerNotMain
} from 'footballsimulationengine';
import { ETypeDragTactics } from '../../constants/type-drag-drop';

export interface IDropResultData {
	position: EPlayerPositionName;
	coordinates: [number, number];
	player: IPlayer;
}
export interface IPosition
	extends Pick<IDropResultData, 'coordinates' | 'position'> {
	player: IPlayer | null;
}

export interface IDropResult {
	data: IDropResultData | IRealPlayerNotMain;
	type: ETypeDragTactics;
}
