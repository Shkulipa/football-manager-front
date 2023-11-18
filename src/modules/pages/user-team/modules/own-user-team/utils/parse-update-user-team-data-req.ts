import { IGetOwnTeamRes } from '@/api/rest/user-team/types/get-own-team-res';

export const parseUpdateUserTeamDataReq = (team: IGetOwnTeamRes) => {
	const main = Object.fromEntries(
		Object.entries(team.main || {}).map(([position, player]) => [
			position,
			player._id
		])
	);
	const bench = team.bench.map(p => p._id);
	const reserve = team.reserve.map(p => p._id);

	return {
		main,
		bench,
		reserve
	};
};
