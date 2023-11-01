import { SERVER_URL, revalidate } from '@/constants';
import { ITeam } from './teams.types';

/**
 * @info
 * get Teams without join squads
 */
export const getTeamsWithoutJoinSquad = async (): Promise<ITeam[]> => {
	const resJSON = await fetch(
		`${SERVER_URL}/real-team/short-info?limit=50&page=1`,
		{ next: { revalidate } }
	);

	return resJSON.json();
};
