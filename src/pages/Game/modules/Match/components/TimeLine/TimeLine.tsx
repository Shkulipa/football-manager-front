import cn from 'classnames';
import { parseTime } from '@/utils/parseTime';
import styles from './TimeLine.module.scss';
import { ITimeLineProps } from './TimeLine.types';
import { gameLength } from '@/constants';

export function TimeLine({
	isPlay,
	currentIteration,
	time
}: ITimeLineProps): JSX.Element {
	const timeLineWidth = (currentIteration * 100) / gameLength;

	return (
		<div className={styles.timeline}>
			<div className={styles.time}>
				<div className={styles.clock}>
					<div
						className={cn(styles.shortLine, {
							[styles.isAnimate]: isPlay
						})}
					/>
					<div
						className={cn(styles.longerLine, {
							[styles.isAnimate]: isPlay
						})}
					/>
				</div>
				<div className={styles.timeText}>{parseTime(time)}</div>
			</div>
			<div className={styles.line}>
				<div
					className={styles.passedLine}
					style={{ width: `${timeLineWidth}%` }}
				/>
			</div>
		</div>
	);
}
