import cn from 'classnames';
import ArrowSecondarySVG from 'src/assets/icons/arrow-secondary.svg';

import { IArrowProps } from './arrow.interfaces';
import styles from './arrow.module.scss';

export function Arrow({ className, ...props }: IArrowProps) {
	return (
		<img
			className={cn(styles.arrow, className)}
			src={ArrowSecondarySVG}
			{...props}
		/>
	);
}
