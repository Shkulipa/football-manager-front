import { IPlayersTableProps } from './PlayersTable.types';
import styles from './PlayersTable.module.scss';

export const PlayersTable = ({
	title,
	children
}: IPlayersTableProps): JSX.Element => {
	return (
		<div className={styles.playersTable}>
			<div className={styles.title}>{title}</div>
			{children}
		</div>
	);
};
