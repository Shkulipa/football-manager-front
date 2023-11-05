import { ITeam, IPlayer } from 'footballsimulationengine';
import { IDropResultData } from '../types/position.types';

/**
 * @info
 * when you need swap players, example:
 * - From main squad into Football Field
 * - Player from football Field into another Football field with player
 */
export const swapPlayers = (
	userTeam: ITeam,
	firstPlayer: IDropResultData,
	secondPlayer: IPlayer
) => {
	const updatedTeam = userTeam.players.map(player => {
		// player that is the position, on him we fall player from the start dragging
		if (player.position === firstPlayer.position) {
			// delete player of field data
			return {
				...player,
				...secondPlayer,
				originPOS: player.originPOS,
				position: player.position
			};
		}

		// player which was selected at the start dragging
		if (player.position === secondPlayer.position) {
			// delete player of table data
			return {
				...player,
				...firstPlayer.player,
				originPOS: player.originPOS,
				position: player.position
			};
		}

		return player;
	});

	return updatedTeam;
};
