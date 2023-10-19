'use client';

import { GlobalModal } from '@/components/GlobalModal/GlobalModal';
import { setNetworkError } from '@/components/GlobalModal/store';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useEffect } from 'react';

export const NetworkError = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { networkError } = useAppSelector(state => state.errorReducer);

	const closeGlobalErrorHandler = () =>
		dispatch(dispatch(setNetworkError(false)));

	useEffect(() => {
		window.addEventListener('offline', () => {
			dispatch(setNetworkError(true));
		});

		return () => {
			window.removeEventListener('offline', () =>
				dispatch(setNetworkError(true))
			);
		};
	}, []);

	return (
		<GlobalModal
			title={'Network Connection Error'}
			description={'Please, check your Internet connection'}
			isShow={networkError}
			callbackClose={closeGlobalErrorHandler}
		/>
	);
};
