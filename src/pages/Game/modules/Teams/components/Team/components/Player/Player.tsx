import cn from 'classnames';
import { RatingStars } from '@/components';
import { IPlayerProps } from './Player.types';
import styles from './Player.module.scss';
import { ratingHelper } from '@/utils/ratingPlayer.helper';

export function Player({
	player,
	className,
	...props
}: IPlayerProps): JSX.Element {
	const { fitness, name, number, skill, stats } = player;

	// cards beside name's player & injured
	const { goals, passes, shots, tackles } = stats;

	const ratingInStars = ratingHelper(skill);

	const shotsPercent = ((shots.on * 100) / shots.total).toFixed();
	const isShots = parseInt(shotsPercent) > 0 ? shotsPercent : 0;

	return (
		<div className={cn(styles.playerData, className)} {...props}>
			<div>{number}</div>
			<div>{name}</div>
			<div>{fitness.toFixed()}%</div>
			<div>{passes.total}</div>
			<div>
				{shots.on}/{shots.total} | {isShots || 0}%
			</div>
			<div>{tackles.fouls}</div>
			<div>{goals}</div>
			<div className={styles.ratingInStars}>
				<RatingStars rating={ratingInStars} />
			</div>
		</div>
	);
}
