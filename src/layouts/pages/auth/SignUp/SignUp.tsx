'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useUnmount } from '@/hooks/useUnmount';

import { ModalConfirmedAccountYet } from '@/components';
import { FormSignUp } from './components/FormSignUp/FormSignUp';
import { FormSignUpSuccess } from './components/FormSignUpSuccess/FormSignUpSuccess';
import { reset } from './store/sign-up.slice';

export function SignUp(): JSX.Element {
	const dispatch = useAppDispatch();
	const { step } = useAppSelector(state => state.signUpReducer);

	useUnmount(() => dispatch(reset()));

	switch (step) {
		case null:
			return <FormSignUp />;
		case 'success':
			return <FormSignUpSuccess />;
		case 'confirmed':
			return <ModalConfirmedAccountYet />;
		default:
			return <></>;
	}
}
