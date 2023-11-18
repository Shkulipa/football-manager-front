import { apiPrivate } from '@/api/instance';
import { ISquadUpdateReq } from './types/squad-update';
import { IServerSuccessRes } from '../types/server-success-res';

export const getCurrentLiveMatch = async () =>
	await apiPrivate.get<string>(`/match`);

export const squadUpdate = async (matchId: string, data: ISquadUpdateReq) =>
	await apiPrivate.put<IServerSuccessRes>(`/match/squad/${matchId}`, data);

export const apiRatingMatch = {
	getCurrentLiveMatch,
	squadUpdate
};
