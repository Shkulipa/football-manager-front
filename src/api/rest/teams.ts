import { SERVER_URL, revalidate } from '@/constants';

/**
 * @info
 * get Teams without join squads
 */
export const getTeamsWithoutJoinSquad = async () => {
	const teams = await fetch(
		`${SERVER_URL}/real-team/short-info?limit=50&page=1`,
		{
			next: { revalidate }
		}
	);

	return teams.json();
};
