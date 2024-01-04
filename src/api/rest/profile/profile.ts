import { apiPrivate } from '@/api/instance';
import { IServerSuccessRes } from '../types/server-success-res';
import { IChangePasswordReq } from './type/change-password-req';
import { IChangeUsernameReq } from './type/change-username-req';
import { IChangeEmailReq } from './type/change-email-req';

export const changeUsername = async (data: IChangeUsernameReq) =>
	await apiPrivate.patch<IServerSuccessRes>('/user/username', data);

export const changePassword = async (data: IChangePasswordReq) =>
	await apiPrivate.patch<IServerSuccessRes>('/user/password', data);

export const changeEmail = async (data: IChangeEmailReq) =>
	await apiPrivate.patch<IServerSuccessRes>('/user/email', data);

export const apiProfile = {
	changeUsername,
	changePassword,
	changeEmail
};
