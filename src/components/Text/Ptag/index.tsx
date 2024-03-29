import cn from 'classnames';

import { IPtagProps } from './Ptag.types';
import styles from './Ptag.module.scss';

export const Ptag = ({
	children,
	className,
	size = 'm',
	...props
}: IPtagProps): JSX.Element => {
	return (
		<p
			className={cn(styles.p, className, {
				[styles.s]: size == 's',
				[styles.m]: size == 'm',
				[styles.l]: size == 'l'
			})}
			{...props}
		>
			{children}
		</p>
	);
};
