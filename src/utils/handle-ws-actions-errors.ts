import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { showGlobalError } from '@/components/GlobalModal/store';
import { IServerError } from '@/api/rest/types/server-error';
import { logout } from '@/layouts/AuthLayout/store/user';

interface THandleActionErrorProps {
	e: any;
	dispatch: ThunkDispatch<any, unknown, AnyAction>;
	additionalConditions?: (
		error: THandleActionErrorProps['e']
	) => boolean | void;
}

export function handleWsActionErrors({
	e,
	dispatch,
	additionalConditions
}: THandleActionErrorProps): void {
	if (
		e &&
		(e.message === 'Token not provided' ||
			e.message ===
				'UnauthorizedException: Your Session has expired, please login again')
	) {
		dispatch(logout());
		const globalError: IServerError = {
			error: 'Unauthorized Exception',
			message: e.message || 'Unauthorize exception, please re-login',
			statusCode: 1005
		};
		dispatch(showGlobalError(globalError));
		return;
	}

	if (additionalConditions) {
		const hasReturn = additionalConditions(e);
		if (hasReturn) return;
	}

	const globalError: IServerError = {
		error: 'Error',
		message: e.message || 'Unknown error',
		statusCode: 1005
	};
	dispatch(showGlobalError(globalError));
	return;
}
