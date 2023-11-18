import { IPlayer, ITeam } from 'footballsimulationengine';
import { IDropResultData } from '../types/position.types';

export const movePlayer = (
	userTeam: ITeam,
	footballEmptyField: IDropResultData,
	player: IPlayer
) => {
	const updatedTeam = userTeam.players.map(p => {
		if (p._id === player._id) {
			return {
				...p,
				intentPOS: footballEmptyField.coordinates,
				position: footballEmptyField.position
			};
		}

		return p;
	});

	return updatedTeam;
};
