import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { IFormikUpdateUsername } from './types/formik-update-username';
import { updateUsernameValidation } from './update-username.validation';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { Button, FormikInput } from '@/components';
import styles from './UpdateUsername.module.scss';
import { apiProfile } from '@/api/rest/profile/profile';
import { setUser } from '@/layouts/AuthLayout/store/user';

const initialValues: IFormikUpdateUsername = {
	username: ''
};

export const UpdateUsername = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(s => s.userReducer);
	const [isSuccess, setIsSuccess] = useState(false);

	const formik = useFormik<IFormikUpdateUsername>({
		initialValues,
		validationSchema: updateUsernameValidation,
		onSubmit: async (values, formik) => {
			try {
				await apiProfile.changeUsername(values);
				if (user) dispatch(setUser({ ...user, username: values.username }));
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
		<div>Username was successfully changed!</div>
	) : (
		<>
			<FormikInput
				key="username"
				id="username"
				name="username"
				placeholder="New username"
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
