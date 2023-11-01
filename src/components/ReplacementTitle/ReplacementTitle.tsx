import { IReplacementTitleProps } from './ReplacementTitle.types';
import styles from './Replacement.module.scss';

export const ReplacementTitle = ({
	title
}: IReplacementTitleProps): JSX.Element => {
	return <div className={styles.title}>{title}</div>;
};
