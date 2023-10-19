import { isAxiosError, isCancel } from 'axios';
import { FormikHelpers } from 'formik';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { showGlobalError } from '@/components/GlobalModal/store';
import { IServerError } from '@/types/server-error';
import { ServerStatus } from '@/constants/server-status.enum';

interface THandleActionErrorProps {
	e: unknown;
	dispatch: ThunkDispatch<any, unknown, AnyAction>;
	formik?: FormikHelpers<any>;
}

export function handleActionErrors({
	e,
	dispatch,
	formik
}: THandleActionErrorProps): void {
	if (formik) formik.setSubmitting(false);

	if (!isAxiosError<IServerError>(e) || !e.response) {
		console.error(e);
		return;
	}

	const { status, data } = e.response;
	if (isCancel(e)) return;

	const badReq = status === ServerStatus.BAD_REQUEST;
	const notFoundReq = status === ServerStatus.NOT_FOUND;
	const forbiddenReq = status === ServerStatus.FORBIDDEN;
	if (formik && (badReq || notFoundReq || forbiddenReq)) {
		formik.setErrors(data.message as any);
		return;
	}

	dispatch(showGlobalError(data));
}
