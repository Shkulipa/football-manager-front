import { IGetOwnTeamRes } from '@/api/rest/user-team/types/get-own-team-res';

export const isEqualSquad = (
	initVersionTeam: IGetOwnTeamRes,
	secondVersionTeam: IGetOwnTeamRes
) => {
	const isEqualBench =
		initVersionTeam.bench
			.map(v => v._id)
			.every(val => secondVersionTeam.bench.map(v => v._id).includes(val)) &&
		initVersionTeam.bench.length === secondVersionTeam?.bench.length;
	const isEqualReserve =
		initVersionTeam?.reserve
			.map(v => v._id)
			.every(val => secondVersionTeam.reserve.map(v => v._id).includes(val)) &&
		initVersionTeam?.reserve.length === secondVersionTeam?.reserve.length;
	const isEqualMainPositions =
		Object.keys(initVersionTeam?.main || {}).every(val =>
			Object.keys(secondVersionTeam?.main || {}).includes(val)
		) &&
		Object.keys(initVersionTeam?.main || {}).length ===
			Object.keys(secondVersionTeam?.main || {}).length;

	const isEqualMainPlayers =
		Object.entries(initVersionTeam?.main || {})
			.map(([position, player]) => [position, player._id])
			.every(([positionOld, playerOld]) =>
				Object.entries(secondVersionTeam?.main || {})
					.map(([position, player]) => [position, player._id])
					.find(
						([positionNew, playerNew]) =>
							positionOld === positionNew && playerOld === playerNew
					)
			) &&
		Object.values(initVersionTeam?.main || {}).length ===
			Object.values(secondVersionTeam?.main || {}).length;

	const isEqual =
		isEqualMainPlayers &&
		isEqualMainPositions &&
		isEqualBench &&
		isEqualReserve;

	return isEqual;
};
