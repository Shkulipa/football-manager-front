import { apiPublic } from '@/api/instance';
import { ISignInRes } from './types/sign-in-res';
import { ISignInReq } from './types/sign-in-req';
import { ISignUpReq } from './types/sing-up-req';
import { IServerSuccessRes } from '../types/server-success-res';
import { IRecoverPassword } from './types/recover-password';
import { IForgotPassword } from './types/forgot-password';

export const login = async (data: ISignInReq) =>
	await apiPublic.post<ISignInRes>('/auth/login', data);

export const signUp = async (data: ISignUpReq) =>
	await apiPublic.post<IServerSuccessRes>('/auth/signup', data);

export const forgotPassword = async (data: IForgotPassword) =>
	await apiPublic.post<IServerSuccessRes>('/auth/restore-password', data);

export const recoverPassword = async (data: IRecoverPassword) =>
	await apiPublic.patch<IServerSuccessRes>('/auth/restore-password', data);

export const logout = async () =>
	await apiPublic.post<IServerSuccessRes>('/auth/logout');

export const refreshToken = async () =>
	await apiPublic.post<ISignInRes>('/token/refresh');

export const apiAuth = {
	login,
	signUp,
	forgotPassword,
	recoverPassword,
	logout,
	refreshToken
};
