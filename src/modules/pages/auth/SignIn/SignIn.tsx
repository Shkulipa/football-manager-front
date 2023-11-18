'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useUnmount } from '@/hooks/useUnmount';
import { reset } from './store/signIn.slice';
import { SignInForm } from './forms/SignInForm/SignInForm';
import { ModalConfirmedAccountYet } from '@/components';
import { NotActivated } from './forms/NotActivated';

export function SignIn(): JSX.Element {
	const dispatch = useAppDispatch();
	const { step } = useAppSelector(s => s.signInReducer);

	useUnmount(() => dispatch(reset()));

	switch (step) {
		case null:
			return <SignInForm />;
		case 'not-activate':
			return <NotActivated />;
		case 'confirmed':
			return <ModalConfirmedAccountYet />;
		default:
			return <></>;
	}
}
