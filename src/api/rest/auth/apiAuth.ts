import { apiPublic } from '@/api/instance';
import { ISignInRes } from './types/sign-in-res';
import { ISignInReq } from './types/sign-in-req';
import { IServerSuccessRes } from '@/types/server-seccess-res';

export const login = async (data: ISignInReq) =>
	await apiPublic.post<ISignInRes>('/auth/login', data);

export const logout = async () =>
	await apiPublic.post<IServerSuccessRes>('/auth/logout');

export const refreshToken = async () =>
	await apiPublic.post<ISignInRes>('/token/refresh');

export const apiAuth = {
	login,
	logout,
	refreshToken
};
