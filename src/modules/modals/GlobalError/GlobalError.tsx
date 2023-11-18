'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { CardContentModal } from '@/components/CardContentModal';
import { resetGlobalError } from '@/components/GlobalModal/store';
import { GlobalModal } from '@/components/GlobalModal/GlobalModal';

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
			isShow={Boolean(globalError?.message) || false}
			callbackClose={closeGlobalErrorHandler}
		>
			<CardContentModal
				isShowCloseButton
				title={globalError?.error || 'Occurred Error'}
				description={globalError?.message || ''}
				callbackClose={closeGlobalErrorHandler}
			/>
		</GlobalModal>
	);
};
