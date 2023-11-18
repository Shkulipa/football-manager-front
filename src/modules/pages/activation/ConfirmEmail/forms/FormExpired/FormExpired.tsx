import { apiActivation } from '@/api/rest/activation/apiActivation';
import { Button, ErrorNotification } from '@/components';
import { CardContentModal } from '@/components/CardContentModal';
import { ContentModal } from '@/components/ContentModal';
import { EServerStatus } from '@/constants/server-status.enum';
import { CardTitle } from '@/components/CardTitle';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { parseTimer } from '@/utils/parse-timer';
import { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setError } from '../../store/confirm-email.slice';
import styles from './FormExpired.module.scss';
import { EUSER } from '@/constants/user.enum';
import { ROUTES } from '@/constants/routes.enum';

const coolDownInSeconds = 59;

export const FormExpired = (): JSX.Element => {
	const router = useRouter();
	const expiryTimestamp = new Date();
	const getExpireTimestampStorage = sessionStorage.getItem(
		EUSER.SESSION_STORAGE_COOL_DOWN_SEND_EMAILS
	) as string;
	const expireInit =
		new Date(parseInt(getExpireTimestampStorage)) || expiryTimestamp;

	const dispatch = useAppDispatch();
	const { error } = useAppSelector(s => s.confirmEmailReducer);
	const queries = useSearchParams();
	const username = queries?.get('username');

	const [isCoolDown, setIsCoolDown] = useState(false);

	const { restart, seconds, minutes } = useTimer({
		expiryTimestamp: expireInit,
		onExpire: () => {
			setIsCoolDown(false);
		}
	});

	const sendAgainHandler = async () => {
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
				title="Activation Link Expired"
				description="Activation link was expired, you can send new letter for confirm your email"
			>
				<Button onClick={sendAgainHandler} disabled={isCoolDown}>
					{textBtn}
				</Button>
			</CardContentModal>
		</ContentModal>
	);
};
