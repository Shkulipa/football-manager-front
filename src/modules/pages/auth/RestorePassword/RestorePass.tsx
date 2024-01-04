'use client';

import {
	ErrorNotification,
	FormikInput,
	ModalWrapper,
	Button,
	Card,
	Ptag
} from '@/components';
import { useFormik } from 'formik';
import { useAppDispatch } from '@/hooks/redux';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { apiAuth } from '@/api/rest/auth/apiAuth';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { CardFormContent } from '@/components/CardFormContent/CardFormContent';
import { IFormikRestorePassword } from './RestorePassword';
import { restorePasswordValidation } from './restore-password.validation';
import { ROUTES } from '@/constants/routes.enum';
import styles from './RestorePass.module.scss';
import { SuccessIcon } from '@/icons';

const initialValues: IFormikRestorePassword = {
	password: '',
	confirmPassword: ''
};

export function RestorePassword(): JSX.Element {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const params = useParams();
	const [isSuccess, setIsSuccess] = useState(false);

	useEffect(() => {
		if (!params.id && params.id.length > 0) router.push(ROUTES.HOME);
	}, []);

	const formik = useFormik<IFormikRestorePassword>({
		initialValues,
		validationSchema: restorePasswordValidation,
		onSubmit: async (values, formik) => {
			try {
				const data = {
					activationId: params.id[0],
					newPassword: values.password,
					confirmPassword: values.confirmPassword
				};
				await apiAuth.recoverPassword(data);
				setIsSuccess(true);
			} catch (e) {
				handleActionErrors({
					e,
					dispatch,
					formik
				});
			} finally {
				formik?.setSubmitting(false);
			}
		},
		validateOnMount: true
	});

	// error from server
	const error = typeof formik.errors === 'string' && (
		<ErrorNotification message={formik.errors} />
	);

	if (isSuccess)
		return (
			<ModalWrapper>
				<Card className={styles.cardWrapper}>
					<div className={styles.titleStatus}>
						<SuccessIcon />
						<Ptag size="m">Success</Ptag>
					</div>

					<Ptag size="s">
						You can go to &apos;Sign In&apos;, and login with new password
					</Ptag>
					<Button onClick={() => router.push(ROUTES.AUTH_SIGN_IN)}>
						Sign in
					</Button>
				</Card>
			</ModalWrapper>
		);

	return (
		<ModalWrapper>
			<CardFormContent
				title="Forgot Password"
				formProps={{
					onSubmit: formik.handleSubmit
				}}
				error={error}
				buttons={[
					<Button
						key="submit-btn"
						type="submit"
						isLoading={formik.isSubmitting}
						disabled={!formik.isValid}
					>
						restore
					</Button>
				]}
			>
				<FormikInput
					key="password"
					name="password"
					placeholder="New Password"
					type="password"
					formik={formik}
				/>
				<FormikInput
					key="confirmPassword"
					name="confirmPassword"
					type="password"
					placeholder="Confirm password"
					formik={formik}
				/>
			</CardFormContent>
		</ModalWrapper>
	);
}
