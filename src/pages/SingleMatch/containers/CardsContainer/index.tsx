import { ICardsContainerProps } from './CardsContainer.types';
import styles from './CardsContainer.module.scss';

export function CardsContainer({
	children
}: ICardsContainerProps): JSX.Element {
	return <div className={styles.cardsContainer}>{children}</div>;
}
