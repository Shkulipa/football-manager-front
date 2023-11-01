import { apiPublic } from '@/api/instance';

import { IActivationEmailReq } from './types/activation-email';
import { IConfirmEmailReq } from './types/confirm-email';
import { IServerSuccessRes } from '../types/server-success-res';

export const sendActivationEmail = async (data: IActivationEmailReq) =>
	await apiPublic.post<IServerSuccessRes>('/activation', data);

export const confirmEmail = async (data: IConfirmEmailReq) =>
	await apiPublic.post<IServerSuccessRes>(
		`/activation/confirm-email/${data.token}`
	);

export const apiActivation = {
	sendActivationEmail,
	confirmEmail
};
