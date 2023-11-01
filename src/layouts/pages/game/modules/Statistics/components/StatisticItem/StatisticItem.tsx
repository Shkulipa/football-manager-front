import cn from 'classnames';

import { ITabMatchProps } from './StatisticItem.types';
import styles from './StatisticItem.module.scss';

export function StatisticItem({
	leftText,
	middleText,
	rightText,
	className,
	...props
}: ITabMatchProps) {
	return (
		<div className={cn(styles.statisticItem, className)} {...props}>
			<div className={styles.statisticText}>{leftText}</div>
			<div className={styles.statisticItemTitle}>{middleText}</div>
			<div className={styles.statisticText}>{rightText}</div>
		</div>
	);
}
