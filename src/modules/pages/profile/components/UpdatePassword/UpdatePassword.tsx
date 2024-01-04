import { useFormik } from 'formik';
import React, { useState } from 'react';
import { updatePasswordValidation } from './update-password.validation';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { Button, FormikInput } from '@/components';
import styles from './UpdatePassword.module.scss';
import { apiProfile } from '@/api/rest/profile/profile';
import { useAppDispatch } from '@/hooks/redux';
import { IFormikUpdatePassword } from './types/formik-update-password';

const initialValues: IFormikUpdatePassword = {
	oldPassword: '',
	password: '',
	confirmPassword: ''
};

export const UpdatePassword = () => {
	const dispatch = useAppDispatch();
	const [isSuccess, setIsSuccess] = useState(false);

	const formik = useFormik<IFormikUpdatePassword>({
		initialValues,
		validationSchema: updatePasswordValidation,
		onSubmit: async (values, formik) => {
			try {
				const data = {
					...values,
					confirmNewPassword: values.confirmPassword,
					newPassword: values.password
				};
				await apiProfile.changePassword(data);
				setIsSuccess(true);
				formik.resetForm();
				setTimeout(() => setIsSuccess(false), 5000);
			} catch (e) {
				handleActionErrors({
					e,
					dispatch
				});
			} finally {
				formik?.setSubmitting(false);
			}
		},
		validateOnMount: true
	});

	const content = isSuccess ? (
		<div>Password was successfully changed!</div>
	) : (
		<>
			<FormikInput
				key="oldPassword"
				id="oldPassword"
				name="oldPassword"
				placeholder="Old password"
				formik={formik}
			/>
			<FormikInput
				key="password"
				id="password"
				name="password"
				placeholder="New password"
				formik={formik}
			/>
			<FormikInput
				key="confirmPassword"
				id="confirmPassword"
				name="confirmPassword"
				placeholder="Confirm password"
				formik={formik}
			/>
			<Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
				Change
			</Button>
		</>
	);

	return (
		<form
			autoComplete="off"
			onSubmit={formik.handleSubmit}
			className={styles.form}
		>
			{content}
		</form>
	);
};
