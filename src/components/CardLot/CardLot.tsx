import dateFormat from 'dateformat';
import { ICardLotProps } from './CardLot.types';
import styles from './CardLot.module.scss';
import { PlayerCard } from '@/components/PlayerCard';

export const CardLot = ({ lot, children }: ICardLotProps): JSX.Element => {
	const { player, createdAt, price } = lot;

	return (
		<div className={styles.card}>
			<PlayerCard player={player} className={styles.playerCard} />
			<hr />
			<div>Price: {price}</div>
			<div>{dateFormat(new Date(createdAt), 'ddd | mmm d | HH:MM TT')}</div>
			{children}
		</div>
	);
};
