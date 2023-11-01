'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { GlobalModal } from '../../components/GlobalModal/GlobalModal';
import { resetGlobalError } from '../../components/GlobalModal/store';

/**
 * @info
 * show error from server, which was set in handleError in axios
 */
export const GlobalError = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { globalError } = useAppSelector(state => state.errorReducer);
	const closeGlobalErrorHandler = () => dispatch(resetGlobalError());

	return (
		<GlobalModal
			title={globalError?.error || 'Occurred Error'}
			description={globalError?.message || ''}
			isShow={Boolean(globalError?.message) || false}
			callbackClose={closeGlobalErrorHandler}
		/>
	);
};
