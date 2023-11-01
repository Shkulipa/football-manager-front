import { apiPrivate } from '@/api/instance';
import { IGetOwnTeamRes } from './types/get-own-team-res';
import { IServerSuccessRes } from '../types/server-success-res';

export const getOwnTeam = async () =>
	await apiPrivate.get<IGetOwnTeamRes>('/user-team');

export const createTeam = async (data: FormData) =>
	await apiPrivate.post<IServerSuccessRes>('/user-team', data);

export const apiUserTeam = {
	getOwnTeam,
	createTeam
};
