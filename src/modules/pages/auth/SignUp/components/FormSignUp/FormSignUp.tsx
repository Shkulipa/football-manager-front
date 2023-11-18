'use client';

import {
	ErrorNotification,
	FormikInput,
	ModalWrapper,
	TextLink
} from '@/components';
import { useFormik } from 'formik';
import { ISignUpReq } from '@/api/rest/auth/types/sing-up-req';
import { ROUTES } from '@/constants/routes.enum';

import { signUpValidation } from '@/validations/sign-up.validation';

import { useAppDispatch } from '@/hooks/redux';
import { SignButton } from '@/modules/pages/auth/components/SignButton';
import { Switcher } from '@/modules/pages/auth/components/Switcher';

import { signUpAsync } from '../../store/sign-up.slice';
import { CardFormContent } from '@/components/CardFormContent/CardFormContent';

const initialValues: ISignUpReq = {
	username: '',
	email: '',
	password: '',
	confirmPassword: ''
};

export function FormSignUp(): JSX.Element {
	const dispatch = useAppDispatch();

	const formik = useFormik<ISignUpReq>({
		initialValues,
		validationSchema: signUpValidation,
		onSubmit: (values, formik) => {
			dispatch(signUpAsync({ values, formik }));
		},
		validateOnMount: true
	});

	// error from server
	const error = typeof formik.errors === 'string' && (
		<ErrorNotification message={formik.errors} />
	);

	return (
		<ModalWrapper>
			<CardFormContent
				title="Sign Up"
				formProps={{
					onSubmit: formik.handleSubmit
				}}
				error={error}
				buttons={[
					<SignButton
						key="submit-btn"
						type="submit"
						isLoading={formik.isSubmitting}
						disabled={!formik.isValid}
					>
						Sign Up
					</SignButton>
				]}
			>
				<FormikInput
					key="username"
					id="username"
					name="username"
					placeholder="Username..."
					formik={formik}
				/>
				<FormikInput
					key="email"
					id="email"
					name="email"
					placeholder="Email..."
					type="email"
					formik={formik}
				/>
				<FormikInput
					key="password"
					id="password"
					name="password"
					type="password"
					placeholder="Password..."
					formik={formik}
				/>
				<FormikInput
					key="confirmPassword"
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					placeholder="Confirm password..."
					formik={formik}
				/>
				<Switcher key="switcher">
					Have account yet?{' '}
					<TextLink href={ROUTES.AUTH_SIGN_IN} text="Sign In" />
				</Switcher>
			</CardFormContent>
		</ModalWrapper>
	);
}
