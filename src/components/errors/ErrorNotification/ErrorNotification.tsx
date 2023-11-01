import cn from 'classnames';
import { Error } from '@/icons';
import { IErrorNotificationProps } from './ErrorNotification.types';
import styles from './ErrorNotification.module.scss';

export function ErrorNotification({
	message,
	className,
	...props
}: IErrorNotificationProps): JSX.Element {
	return (
		<div className={cn(styles.errorNotificationWrapper, className)} {...props}>
			<Error className={styles.icon} width={24} height={24} direction="top" />
			<div className={styles.message}>{message}</div>
		</div>
	);
}
