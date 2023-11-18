import { ITeam } from 'footballsimulationengine';

export const isEqualSquad = (
	initVersionTeam: ITeam,
	secondVersionTeam: ITeam
) => {
	/**
	 * @todo
	 * check main squad
	 */

	const isEqualBench =
		initVersionTeam.bench
			.map(v => v._id)
			.every(val => secondVersionTeam.bench.map(v => v._id).includes(val)) &&
		initVersionTeam.bench.length === secondVersionTeam?.bench.length;

	const isEqualMain = initVersionTeam.players
		.map(p => ({
			_id: p._id,
			position: p.position
		}))
		.every(val =>
			secondVersionTeam.players
				.map(p => ({
					_id: p._id,
					position: p.position
				}))
				.find(p => val._id === p._id && val.position === p.position)
		);
	const isEqual = isEqualBench && isEqualMain;

	return isEqual;
};
