import { IRealPlayer } from '@/types/primary/real-player';
import {
	EPlayerPositionName,
	IRealPlayerNotMain
} from 'footballsimulationengine';
import { ETypeDragTactics } from '../constants/type-drag-drop';

export interface IDropResultUserTeamData {
	position: EPlayerPositionName;
	coordinates: [number, number];
	currentPlayer: IRealPlayer;
}
export interface IPosition
	extends Pick<IDropResultUserTeamData, 'coordinates' | 'position'> {
	currentPlayer: IRealPlayer | null;
}

export interface IDropResultUserTeam {
	data: IDropResultUserTeamData | IRealPlayerNotMain;
	type: ETypeDragTactics;
}
