'use client';

import { apiActivation } from '@/api/rest/activation/apiActivation';
import { ErrorNotification, Button } from '@/components';
import { CardContentModal } from '@/components/CardContentModal';
import { ContentModal } from '@/components/ContentModal';
import { ROUTES } from '@/constants/routes.enum';
import { EServerStatus } from '@/constants/server-status.enum';
import { EUSER } from '@/constants/user.enum';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { CardTitle } from '@/components/CardTitle';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { parseTimer } from '@/utils/parse-timer';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { setError, setStep } from '../../store/signIn.slice';
import styles from './NotActivated.module.scss';

const coolDownInSeconds = 59;

export const NotActivated = () => {
	const router = useRouter();
	const expiryTimestamp = new Date();
	const getExpireTimestampStorage = sessionStorage.getItem(
		EUSER.SESSION_STORAGE_COOL_DOWN_SEND_EMAILS
	) as string;
	const expireInit =
		new Date(parseInt(getExpireTimestampStorage)) || expiryTimestamp;

	const dispatch = useAppDispatch();
	const { error, username } = useAppSelector(s => s.signInReducer);

	const [isCoolDown, setIsCoolDown] = useState(false);

	const { restart, seconds, minutes } = useTimer({
		expiryTimestamp: expireInit,
		onExpire: () => {
			setIsCoolDown(false);
		}
	});

	const sendEmailHandler = async () => {
		if (!username) return;

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
			await apiActivation.sendActivationEmail({
				username
			});
		} catch (e) {
			handleActionErrors({
				e,
				dispatch,
				additionalConditions(status, data) {
					if (status === EServerStatus.MANY_REQUESTS) {
						dispatch(setError(data.message));
						return true;
					}

					if (status === EServerStatus.CONFLICT) {
						dispatch(setStep('confirmed'));
						return true;
					}
				}
			});
		}
	};

	// error from server
	const errorNotification = error && (
		<ErrorNotification className={styles.errorNotification} message={error} />
	);
	if (error)
		return (
			<ContentModal>
				<CardTitle text="Occurred Error" />
				{errorNotification}
				<Button type="button" onClick={() => router.replace(ROUTES.HOME)}>
					Ok
				</Button>
			</ContentModal>
		);

	const textBtn = isCoolDown
		? `${parseTimer(minutes)}:${parseTimer(seconds)}`
		: 'Send';

	return (
		<ContentModal>
			<CardContentModal
				title="You didn't activate your account"
				description="Please, activate your account for continue. We send email for activation to your email address"
			>
				<Button onClick={sendEmailHandler} disabled={isCoolDown}>
					{textBtn}
				</Button>
			</CardContentModal>
		</ContentModal>
	);
};
