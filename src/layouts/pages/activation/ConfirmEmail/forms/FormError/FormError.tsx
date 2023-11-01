'use client';

import { Button } from '@/components';
import { CardContentModal } from '@/components/CardContentModal';
import { ContentModal } from '@/components/ContentModal';
import { ROUTES } from '@/constants/routes.enum';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import { reset } from '../../store/confirm-email.slice';

export const FormError = (): JSX.Element => {
	const { replace } = useRouter();
	const dispatch = useAppDispatch();
	const { error } = useAppSelector(s => s.confirmEmailReducer);

	const onOk = () => {
		dispatch(reset);
		replace(ROUTES.HOME);
	};

	return (
		<ContentModal>
			<CardContentModal title="Occurred Error" description={error}>
				<Button onClick={onOk}>OK</Button>
			</CardContentModal>
		</ContentModal>
	);
};
