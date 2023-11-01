import { IPlayersLayoutProps } from './PlayersLayout.types';
import styles from './PlayersLayout.module.scss';

export const PlayersLayout = ({
	children
}: IPlayersLayoutProps): JSX.Element => {
	return <div className={styles.playersLayoutWrapper}>{children}</div>;
};
