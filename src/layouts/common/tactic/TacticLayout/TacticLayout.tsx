import { ITacticLayoutProps } from './TacticLayout.types';
import styles from './TacticLayout.module.scss';

export const TacticLayout = ({ children }: ITacticLayoutProps): JSX.Element => {
	return <div className={styles.tacticLayoutWrapper}>{children}</div>;
};
