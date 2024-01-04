'use client';

import {
	ErrorNotification,
	FormikInput,
	ModalWrapper,
	Button
} from '@/components';
import { useFormik } from 'formik';
import { useAppDispatch } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import { IFormikForgotPassword } from './ForgotPassword';
import { forgotPasswordValidation } from './forgot-password.validation';
import React, { useState } from 'react';
import { apiAuth } from '@/api/rest/auth/apiAuth';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { CardFormContent } from '@/components/CardFormContent/CardFormContent';
import { parseTimer } from '@/utils/parse-timer';
import { useTimer } from 'react-timer-hook';
import { EUSER } from '@/constants/user.enum';

const initialValues: IFormikForgotPassword = {
	email: ''
};

const coolDownInSeconds = 59;

export function ForgotPassword(): JSX.Element {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [isCoolDown, setIsCoolDown] = useState(false);

	const { restart, seconds, minutes } = useTimer({
		expiryTimestamp: new Date(),
		onExpire: () => {
			setIsCoolDown(false);
		}
	});

	const formik = useFormik<IFormikForgotPassword>({
		initialValues,
		validationSchema: forgotPasswordValidation,
		onSubmit: async (values, formik) => {
			const newExpiryTimestamp = new Date();
			sessionStorage.setItem(
				EUSER.SESSION_STORAGE_COOL_DOWN_SEND_EMAILS,
				String(Date.now())
			);
			newExpiryTimestamp.setSeconds(
				newExpiryTimestamp.getSeconds() + coolDownInSeconds
			);
			restart(newExpiryTimestamp);
			setIsCoolDown(true);

			try {
				await apiAuth.forgotPassword(values);
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

	const textBtn = isCoolDown
		? `${parseTimer(minutes)}:${parseTimer(seconds)}`
		: 'Send';

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
						disabled={!formik.isValid || isCoolDown}
					>
						{textBtn}
					</Button>,
					<Button
						key="back-btn"
						type="button"
						onClick={() => router.back()}
						isLoading={formik.isSubmitting}
					>
						Back login
					</Button>
				]}
			>
				<FormikInput
					key="email"
					name="email"
					placeholder="Your email..."
					formik={formik}
				/>
			</CardFormContent>
		</ModalWrapper>
	);
}
