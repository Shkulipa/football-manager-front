'use client';

import { CardContentModal } from '@/components/CardContentModal';
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
		<GlobalModal isShow={networkError} callbackClose={closeGlobalErrorHandler}>
			<CardContentModal
				isShowCloseButton
				title={'Network Error Connection'}
				description={
					'Sorry, we are unable to connect to the server. Please check your internet connection and try again.'
				}
				callbackClose={closeGlobalErrorHandler}
			/>
		</GlobalModal>
	);
};
