import { IMessagesLayoutProps } from './MessageLayout.types';
import styles from './MessagesLayout.module.scss';

export const MessagesLayout = ({
	leftSide,
	rightSide
}: IMessagesLayoutProps): JSX.Element => {
	return (
		<div className={styles.messagesLayout}>
			<div className={styles.messagesWrapper}>{leftSide}</div>
			<div className={styles.chatsWrapper}>{rightSide}</div>
		</div>
	);
};
