import { isAxiosError, isCancel } from 'axios';
import { FormikHelpers } from 'formik';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { showGlobalError } from '@/components/GlobalModal/store';
import { IServerError } from '@/api/rest/types/server-error';
import { EServerStatus } from '@/constants/server-status.enum';

interface THandleActionErrorProps {
	e: unknown;
	dispatch: ThunkDispatch<any, unknown, AnyAction>;
	additionalConditions?: (status: number, data: IServerError) => boolean | void;
	formik?: FormikHelpers<any>;
}

export function handleActionErrors({
	e,
	dispatch,
	additionalConditions,
	formik
}: THandleActionErrorProps): void {
	if (formik) formik.setSubmitting(false);

	if (!isAxiosError(e) || !e.response) {
		console.error(e);
		return;
	}

	const { status, data } = e.response;
	if (isCancel(e)) return;

	if (additionalConditions) {
		const hasReturn = additionalConditions(status, data);
		if (hasReturn) return;
	}

	const badReq = status === EServerStatus.BAD_REQUEST;
	const notFoundReq = status === EServerStatus.NOT_FOUND;
	const forbiddenReq = status === EServerStatus.FORBIDDEN;
	const expiredReq = status === EServerStatus.EXPIRED;
	if (formik && (badReq || notFoundReq || forbiddenReq || expiredReq)) {
		formik.setErrors(data.message as any);
		return;
	}

	dispatch(showGlobalError(data));
}
