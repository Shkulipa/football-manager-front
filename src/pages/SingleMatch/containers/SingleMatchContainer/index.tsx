import { ISingleMatchContainerProps } from './SingleMatchContainer.types';
import styles from './SingleMatchContainer.module.scss';

export function SingleMatchContainer({
	children
}: ISingleMatchContainerProps): JSX.Element {
	return <div className={styles.singleMatchContainer}>{children}</div>;
}
