'use client';

import { Button, ErrorNotification, Ptag } from '@/components';
import { useTimer } from 'react-timer-hook';
import { SuccessIcon } from '@/icons';
import { CardTitle } from '@/components/CardTitle';
import styles from './FormSignUp.module.scss';
import { FormSignUpBodyWrapper } from './components/FormSignUpBodyWrapper';
import { useState } from 'react';
import { parseTimer } from '@/utils/parse-timer';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { EServerStatus } from '@/constants/server-status.enum';
import { apiActivation } from '@/api/rest/activation/apiActivation';
import { ContentModal } from '@/components/ContentModal';
import { setError, setStep } from '../../store/sign-up.slice';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes.enum';

const coolDownInSeconds = 59;

export function FormSignUpSuccess(): JSX.Element {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { username, error } = useAppSelector(s => s.signUpReducer);

	const expiryTimestamp = new Date();
	expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + coolDownInSeconds);

	const [isCoolDown, setIsCoolDown] = useState(true);

	const { restart, seconds, minutes } = useTimer({
		expiryTimestamp,
		onExpire: () => {
			setIsCoolDown(false);
		}
	});

	const sendAgainHandler = async () => {
		const newExpireTimestamp = new Date();
		newExpireTimestamp.setSeconds(
			newExpireTimestamp.getSeconds() + coolDownInSeconds
		);
		restart(newExpireTimestamp);
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
		<ContentModal className={styles.contentModalWrapper}>
			<div className={styles.titleWrapper}>
				<CardTitle text="Success" />
				<SuccessIcon width={38} height={38} />
			</div>

			<FormSignUpBodyWrapper>
				<Ptag size="m" className={styles.description}>
					We sent email for next steps, after it you can login,
				</Ptag>

				<div className={styles.sendAgainWrapper}>
					<Ptag size="m" className={styles.sendAgainText}>
						if you didn&apos;t get email, you can send it again:{' '}
					</Ptag>
					<Button
						type="button"
						onClick={sendAgainHandler}
						disabled={isCoolDown}
						className={styles.btn}
					>
						{textBtn}
					</Button>
				</div>
			</FormSignUpBodyWrapper>
		</ContentModal>
	);
}
