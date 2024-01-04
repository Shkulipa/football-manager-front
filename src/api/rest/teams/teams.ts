import { SERVER_URL } from '@/constants';
import { ITeam } from './types/teams.types';
import { IGetRealTeamsReq } from './types/get-real-teams-req';
import { apiPublic } from '@/api/instance';
import { IGetRealTeamsRes } from './types/get-real-teams-res';
import { IRealTeamFullInfo } from '@/types/football-simulator/real-team-full-info';

/**
 * @info
 * get Teams without join squads
 */
export const getTeamsWithoutJoinSquad = async (): Promise<ITeam[]> => {
	const resJSON = await fetch(
		`${SERVER_URL}/real-team/short-info?limit=50&page=1`,
		{ next: { revalidate: false } }
	);

	return resJSON.json();
};

export const getRealTeams = async (params: IGetRealTeamsReq) =>
	await apiPublic.get<IGetRealTeamsRes>('/real-team/full-info', { params });

export const getRealTeam = async (id: string) =>
	await apiPublic.get<IRealTeamFullInfo>(`/real-team/${id}`);
