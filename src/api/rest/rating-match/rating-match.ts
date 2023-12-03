import { apiPrivate } from '@/api/instance';
import { ISquadUpdateReq } from './types/squad-update';
import { IServerSuccessRes } from '../types/server-success-res';
import { IGetRatingRes } from './types/get-rating';

export const getCurrentLiveMatch = async () =>
	await apiPrivate.get<string>(`/match`);

export const getRating = async (limit: number, page: number) =>
	await apiPrivate.get<IGetRatingRes>(
		`/user-team/rating?limit=${limit}&page=${page}`
	);

export const squadUpdate = async (matchId: string, data: ISquadUpdateReq) =>
	await apiPrivate.put<IServerSuccessRes>(`/match/squad/${matchId}`, data);

export const apiRatingMatch = {
	getCurrentLiveMatch,
	squadUpdate,
	getRating
};
