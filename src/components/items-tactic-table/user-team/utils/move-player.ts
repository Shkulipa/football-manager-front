import { TSquadMain } from '@/types/football-simulator/user-team';
import { IDropResultData } from '../types/position-user-team';
import { IRealPlayer } from '@/types/football-simulator/real-player';

export const movePlayer = (
	squad: TSquadMain,
	footballEmptyField: IDropResultData,
	player: IRealPlayer
) => {
	const updatedMainArr = Object.entries(squad).filter(
		p => p[1]._id !== player._id
	);
	const updatedMain = Object.fromEntries(updatedMainArr);
	updatedMain[footballEmptyField.position] = player;

	return updatedMain;
};
