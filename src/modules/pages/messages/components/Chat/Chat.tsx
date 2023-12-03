import cn from 'classnames';
import { IChatProps } from './Chat.types';
import styles from './Chat.module.scss';

export const Chat = ({
	id,
	text,
	onClick,
	isActive
}: IChatProps): JSX.Element => {
	return (
		<div
			className={cn(styles.chatWrapper, {
				[styles.active]: isActive
			})}
			onClick={() => onClick(id)}
		>
			{text}
		</div>
	);
};
