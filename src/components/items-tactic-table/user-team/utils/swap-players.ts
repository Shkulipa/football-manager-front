import { IRealPlayer } from '@/types/football-simulator/real-player';
import { TSquadMain } from '@/types/football-simulator/user-team';

import { IDropResultData } from '../types/position-user-team';

export const swapPlayers = (
	squad: TSquadMain,
	dropResultData: IDropResultData,
	droppedItem: IRealPlayer
) => {
	const mainSquadArr = Object.entries(squad);

	const updatedPlayerInDroppedField = mainSquadArr.map(([key, p]) => {
		if (p._id === droppedItem._id) {
			return [key, dropResultData.player];
		}

		return [key, p];
	});
	const updatedFieldFromDropped = updatedPlayerInDroppedField.map(
		([key, p]) => {
			if (key === dropResultData.position) {
				return [key, droppedItem];
			}
			return [key, p];
		}
	);

	const updatedMain = Object.fromEntries(updatedFieldFromDropped);

	return updatedMain;
};
