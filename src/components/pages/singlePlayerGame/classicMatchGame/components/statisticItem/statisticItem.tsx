import cn from 'classnames';

import { ITabMatchProps } from './statisticItem.interfaces';
import styles from './statisticItem.module.scss';

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
