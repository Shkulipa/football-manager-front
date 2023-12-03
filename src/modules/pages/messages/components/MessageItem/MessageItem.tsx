import cn from 'classnames';
import dateFormat from 'dateformat';
import { IMessageItemProps } from './MessageItem.types';
import styles from './MessageItem.module.scss';

export const MessageItem = ({
	message,
	className,
	isMyMessage = false,
	...props
}: IMessageItemProps): JSX.Element => {
	return (
		<div
			className={cn(
				styles.messageItemWrapper,
				{
					[styles.isMyMessage]: isMyMessage
				},
				className
			)}
			{...props}
		>
			<div className={styles.author}>{message.user.username}</div>
			<div>{message.msg}</div>
			<div className={styles.time}>
				{dateFormat(new Date(message.date), 'ddd | mmm d | HH:MM TT')}
			</div>
		</div>
	);
};
