'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { GlobalModal } from '../../components/GlobalModal/GlobalModal';
import { hideGlobalError } from '../../components/GlobalModal/store';

export const GlobalError = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { globalError } = useAppSelector(state => state.errorReducer);
	const closeGlobalErrorHandler = () => dispatch(hideGlobalError());

	return (
		<GlobalModal
			title={'Error'}
			description={globalError?.message || ''}
			isShow={Boolean(globalError?.message) || false}
			callbackClose={closeGlobalErrorHandler}
		/>
	);
};
