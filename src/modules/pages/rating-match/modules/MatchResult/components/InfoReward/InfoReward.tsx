import { Ptag } from '@/components';
import { IInfoRewardProps } from './InfoReward.types';
import { Cash } from '@/icons';
import styles from './InfoReward.module.scss';

export const InfoReward = ({ reward }: IInfoRewardProps): JSX.Element => {
	return (
		<div className={styles.infoRewardWrapper}>
			<div className={styles.money}>
				<Ptag>Money: +{reward.money}</Ptag>
				<div className={styles.cashIconWrapper}>
					<Cash />
				</div>
			</div>
			<Ptag>
				Rating: {reward.oldRating} &#x21d2;&nbsp;
				{reward.newRating}
			</Ptag>
		</div>
	);
};
