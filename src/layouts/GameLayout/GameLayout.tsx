import { IGameLayoutProps } from './GameLayout.types';
import styles from './GameLayout.module.scss';
import { PaddingContainer } from '@/containers';

export const GameLayout = ({ children }: IGameLayoutProps): JSX.Element => {
	return (
		<div className={styles.game}>
			<PaddingContainer>
				<div className={styles.match}>{children}</div>
			</PaddingContainer>
		</div>
	);
};
