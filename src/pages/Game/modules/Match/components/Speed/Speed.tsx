import cn from 'classnames';
import { BtnIcon } from '@/components';
import { Forward } from '@/icons/Forward';
import styles from './Speed.module.scss';
import { ISpeedProps } from './Speed.types';

export function Speed({
	speedDown,
	speedUp,
	speed,
	isOverMatch
}: ISpeedProps): JSX.Element {
	return (
		<div className={styles.speed}>
			<BtnIcon
				className={cn(styles.forwardIcon, styles.speedDown)}
				onClick={speedDown}
				disabled={isOverMatch || speed === 1}
			>
				<Forward />
			</BtnIcon>

			<div className={styles.speedText}>x{speed}</div>

			<BtnIcon
				className={cn(styles.forwardIcon, styles.speedUp)}
				onClick={speedUp}
				disabled={isOverMatch || speed === 8}
			>
				<Forward />
			</BtnIcon>
		</div>
	);
}
