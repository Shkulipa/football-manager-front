'use client';

import {
	ErrorNotification,
	FormikInput,
	TextLink,
	ModalWrapper
} from '@/components';
import { useFormik } from 'formik';
import { loginValidation } from '@/validations/login.validation';
import { useAppDispatch } from '@/hooks/redux';
import { ISignInReq } from '@/api/rest/auth/types/sign-in-req';
import { Switcher } from '../../../components/Switcher';
import { ROUTES } from '@/constants/routes.enum';
import { SignButton } from '../../../components/SignButton';
import { signInAsync } from '../../store/signIn.slice';
import { CardFormContent } from '@/components/CardFormContent/CardFormContent';
import { GoogleLogin } from '../../components/GoogleLogin/GoogleLogin';

const initialValues: ISignInReq = {
	username: '',
	password: ''
};

export function SignInForm(): JSX.Element {
	const dispatch = useAppDispatch();

	const formik = useFormik<ISignInReq>({
		initialValues,
		validationSchema: loginValidation,
		onSubmit: (values, formik) => {
			dispatch(signInAsync({ values, formik }));
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
				title="Sign In"
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
						Sign In
					</SignButton>,
					<GoogleLogin key="google" />
				]}
			>
				<FormikInput
					key="username"
					name="username"
					placeholder="Username or email..."
					formik={formik}
				/>
				<FormikInput
					key="password"
					name="password"
					placeholder="Password..."
					type="password"
					formik={formik}
				/>
				<div>
					<Switcher key="switcher">
						Haven&apos;t account yet?{' '}
						<TextLink href={ROUTES.AUTH_SIGN_UP} text="Sign Up" />
					</Switcher>
					<Switcher key="switcher">
						Forgot your password?{' '}
						<TextLink href={ROUTES.AUTH_FORGOT_PASSWORD} text="Recover" />
					</Switcher>
				</div>
			</CardFormContent>
		</ModalWrapper>
	);
}
