import { useFormik } from 'formik';
import React, { useState } from 'react';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { Button, FormikInput } from '@/components';
import styles from './UpdateEmail.module.scss';
import { apiProfile } from '@/api/rest/profile/profile';
import { useAppDispatch } from '@/hooks/redux';
import { IFormikUpdateEmail } from './types/formik-update-email';
import { updateEmailValidation } from './update-email.validation';

const initialValues: IFormikUpdateEmail = {
	email: '',
	password: ''
};

export const UpdateEmail = () => {
	const dispatch = useAppDispatch();
	const [isSuccess, setIsSuccess] = useState(false);

	const formik = useFormik<IFormikUpdateEmail>({
		initialValues,
		validationSchema: updateEmailValidation,
		onSubmit: async (values, formik) => {
			try {
				await apiProfile.changeEmail(values);
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
		<div>Email was successfully changed!</div>
	) : (
		<>
			<FormikInput
				key="email"
				id="email"
				name="email"
				placeholder="New email"
				formik={formik}
			/>
			<FormikInput
				key="password"
				id="password"
				name="password"
				placeholder="Password"
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
