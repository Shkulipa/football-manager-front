import { Error } from '@/icons';
import { IErrorNotificationProps } from './ErrorNotification.types';
import styles from './ErrorNotification.module.scss';

export function ErrorNotification({
	message
}: IErrorNotificationProps): JSX.Element {
	return (
		<div className={styles.errorNotificationWrapper}>
			<Error className={styles.icon} width={24} height={24} direction="top" />
			<div className={styles.message}>{message}</div>
		</div>
	);
}
