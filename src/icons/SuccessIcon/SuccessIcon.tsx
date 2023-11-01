import cn from 'classnames';
import { ISuccessIconProps } from './SuccessIcon.types';
import styles from './SuccessIcon.module.scss';
import { SuccessMark } from '@/icons';

export const SuccessIcon = ({
	className,
	width = 24,
	height = 24,
	type = 'outlined'
}: ISuccessIconProps): JSX.Element => {
	return (
		<div
			className={cn(
				styles.successIconWrapper,
				{
					[styles.outlined]: type === 'outlined',
					[styles.filled]: type === 'filled'
				},
				className
			)}
			style={{ width, height }}
		>
			<SuccessMark width={width} height={height} />
		</div>
	);
};
