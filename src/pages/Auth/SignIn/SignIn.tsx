'use client';

import { PaddingContainer } from '@/containers';
import styles from './SignIn.module.scss';
import {
	Button,
	Card,
	ErrorNotification,
	FormikInput,
	Htag
} from '@/components';
import { useFormik } from 'formik';
import { loginValidation } from '@/validations/login.validation';
import { useAppDispatch } from '@/hooks/redux';
import { signInAsync } from './actions';
import { ISignInReq } from '@/api/rest/auth/types/sign-in-req';

const initialValues: ISignInReq = {
	username: '',
	password: ''
};

export function SignIn(): JSX.Element {
	const dispatch = useAppDispatch();

	const formik = useFormik<ISignInReq>({
		initialValues,
		validationSchema: loginValidation,
		onSubmit: (formData, formik) => {
			dispatch(signInAsync({ formData, formik }));
		},
		validateOnMount: true
	});

	// error from server
	const error = typeof formik.errors === 'string' && (
		<ErrorNotification message={formik.errors} />
	);

	return (
		<PaddingContainer className={styles.paddingContainer}>
			<div className={styles.signInContainer}>
				<Card className={styles.card}>
					<Htag className={styles.title} tag="h3">
						Sign In
					</Htag>

					{error}

					<form
						className={styles.form}
						onSubmit={formik.handleSubmit}
						autoComplete="off"
					>
						<div className={styles.inputsWrapper}>
							<FormikInput
								name="username"
								placeholder="Username or email..."
								formik={formik}
							/>

							<FormikInput
								name="password"
								placeholder="Password..."
								type="password"
								formik={formik}
							/>
						</div>

						<Button
							className={styles.submit}
							type="submit"
							isLoading={formik.isSubmitting}
							disabled={!formik.isValid}
						>
							Sign In
						</Button>
					</form>
				</Card>
			</div>
		</PaddingContainer>
	);
}
