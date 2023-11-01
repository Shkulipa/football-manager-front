'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IErrorContentModalProps } from './ErrorContentModal.types';
import { ContentModal } from '@/components/ContentModal';
import { useClickOutside } from '@/hooks/useClickOutside';
import { setError } from '../../store/base-layout.slice';
import { CardContentModal } from '@/components/CardContentModal';

export const ErrorContentModal = ({
	children,
	className,
	...props
}: IErrorContentModalProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const { error } = useAppSelector(s => s.baseLayoutReducer);
	const callbackClose = () => dispatch(setError(''));
	const ref = useClickOutside(callbackClose);

	return (
		<ContentModal className={className} {...props}>
			<CardContentModal
				isShowCloseButton
				title="Occurred Error"
				description={error}
				ref={ref}
				callbackClose={callbackClose}
			>
				{children}
			</CardContentModal>
		</ContentModal>
	);
};
