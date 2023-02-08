import cn from 'classnames';
import { RatingStars } from 'src/components';
import { skillPlayer } from 'src/utils';

import { IPlayerDataProps } from './playerData.interface';
import styles from './playerData.module.scss';

const countSkill = (skill: any) => {
	const values = Object.values(skill);
	const parsedValues = values.map(v => parseInt(v as string));
	const skillSumm = parsedValues.reduce((a, b) => a + b, 0);
	const avrgSkill = skillSumm / parsedValues.length;
	return avrgSkill;
};

export function PlayerData({ player, className, ...props }: IPlayerDataProps) {
	const { fitness, name, number, skill, stats, position } = player;

	// cards beside name's player & injured
	const { cards, goals, passes, shots, tackles } = stats;

	const ratingInStars = skillPlayer({ position, skill }) / 20;

	const shotsProcent = ((shots.on * 100) / shots.total).toFixed();
	const isShots = parseInt(shotsProcent) > 0 ? shotsProcent : 0;

	return (
		<div className={cn(styles.playerData, className)} {...props}>
			<div>{number}</div>
			<div>{name}</div>
			<div>
				<RatingStars rating={ratingInStars} />
			</div>
			<div>{fitness.toFixed()}%</div>
			<div>{passes.total}</div>
			<div>
				{shots.on}/{shots.total} | {isShots || 0}%
			</div>
			<div>{tackles.fouls}</div>
			<div>{goals}</div>
		</div>
	);
}
