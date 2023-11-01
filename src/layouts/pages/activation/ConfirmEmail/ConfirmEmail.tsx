'use client';

import { apiActivation } from '@/api/rest/activation/apiActivation';
import { EServerStatus } from '@/constants/server-status.enum';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { FormSuccess } from './forms/FormSuccess';
import { FormError } from './forms/FormError';
import { reset, setError, setStep } from './store/confirm-email.slice';
import { useUnmount } from '@/hooks/useUnmount';
import { FormExpired } from './forms/FormExpired';
import { ContentLoader } from '@/components';

export const ConfirmEmail = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { step } = useAppSelector(s => s.confirmEmailReducer);
	const params = useParams();

	useUnmount(() => dispatch(reset()));

	/**
	 * @info
	 * set token for confirm account
	 */
	useEffect(() => {
		const sendActivation = async (key: string) => {
			try {
				dispatch(setStep('loading'));
				await apiActivation.confirmEmail({ token: key });
				dispatch(setStep('success'));
			} catch (e) {
				handleActionErrors({
					e,
					dispatch,
					additionalConditions(status, data) {
						/**
						 * @info
						 * when token was deleted after holding there is a lot of time
						 * or was expired, but wasn't deleted yet
						 */
						if (
							status === EServerStatus.EXPIRED ||
							status === EServerStatus.NOT_FOUND
						) {
							dispatch(setStep('expired'));
							return true;
						}

						/**
						 * @info
						 * when token was deleted after holding there is a lot of time
						 */
						if (
							status === EServerStatus.MANY_REQUESTS ||
							status === EServerStatus.BAD_REQUEST ||
							status === EServerStatus.INTERNAL_SERVER ||
							status === EServerStatus.BAD_REQUEST
						) {
							dispatch(setError(data.message));
							dispatch(setStep('error'));
							return true;
						}
					}
				});
			}
		};
		if (params?.key && Array.isArray(params.key) && params.key.length > 0) {
			const key = params.key[0];
			sendActivation(key);
		}
	}, []);

	switch (step) {
		case 'loading':
			return <ContentLoader />;
		case 'success':
			return <FormSuccess />;
		case 'expired':
			return <FormExpired />;
		case 'error':
			return <FormError />;
		default:
			return <></>;
	}
};
