import { IFieldLayoutProps } from './FieldLayout.types';
import styles from './FieldLayout.module.scss';

export const FieldLayout = ({ children }: IFieldLayoutProps): JSX.Element => {
	return <div className={styles.fieldLayoutWrapper}>{children}</div>;
};
