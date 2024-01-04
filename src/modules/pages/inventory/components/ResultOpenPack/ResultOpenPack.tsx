import { IResultOpenPackProps } from './ResultOpenPack.types';
import styles from './ResultOpenPack.module.scss';
import { PlayerCard } from '@/components/PlayerCard';
import { Button, Htag } from '@/components';
import { Cash } from '@/icons';

export const ResultOpenPack = ({
	result,
	closeOpenResult
}: IResultOpenPackProps): JSX.Element => {
	return (
		<div className={styles.resultOpenPackWrapperCenter}>
			<div className={styles.resultOpenPackWrapper}>
				<Htag tag="h2" className={styles.title}>
					Result of opening pack
				</Htag>
				<div className={styles.money}>
					<Htag tag="h3">Money: +{result.money}</Htag>
					<div className={styles.cashIconWrapper}>
						<Cash />
					</div>
				</div>

				<div className={styles.playersBlockWrapper}>
					<div className={styles.players}>
						{result.players.map(p => (
							<PlayerCard key={p._id} player={p} />
						))}
					</div>
				</div>

				<Button onClick={closeOpenResult} className={styles.closeBtn}>
					Back to &apos;Inventory&apos;
				</Button>
			</div>
		</div>
	);
};
