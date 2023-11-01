import {
	IReplacement,
	IRealPlayerNotMain,
	ITeam,
	IPlayer
} from 'footballsimulationengine';
import { initStats } from '../constants/init-stats';

export const replacePlayer = (
	userTeam: ITeam,
	mainPlayer: IPlayer,
	benchPlayer: IRealPlayerNotMain
) => {
	const updatedTeam = userTeam.players.map(player => {
		// set new data of bench player instead of main player
		if (player._id === mainPlayer._id) {
			return {
				...player,
				...benchPlayer,
				stats: initStats
			};
		}

		return player;
	});

	/**
	 * @info
	 * droppedItem - bench player
	 * dropResult.currentPlayer - main player
	 */
	const newReplacement: IReplacement = {
		on: benchPlayer._id,
		off: mainPlayer._id
	};
	const replacements = [...userTeam.replacements, newReplacement];

	// update bench
	const filteredBenchSquad = userTeam.bench.filter(
		p => p._id !== benchPlayer._id
	);

	// new bench player (main player that was replaced on player from bench)
	const benchPlayerData: IRealPlayerNotMain = {
		_id: mainPlayer._id,
		age: mainPlayer.age,
		country: mainPlayer.country,
		name: mainPlayer.name,
		number: mainPlayer.number,
		positions: mainPlayer.positions,
		rating: mainPlayer.rating,
		skill: mainPlayer.skill,
		fitness: mainPlayer.fitness,
		injured: mainPlayer.injured
	};
	const newBenchSquad = [...filteredBenchSquad, benchPlayerData];

	return {
		updatedTeam,
		replacements,
		newBenchSquad
	};
};
