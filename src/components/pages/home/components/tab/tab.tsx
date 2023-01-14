import cn from 'classnames';

import { ITabProps } from './tab.interfaces';
import styles from './tab.module.scss';

export function Tab({ isActive, className, children, ...props }: ITabProps) {
	return (
		<div
			className={cn(
				styles.tab,
				{
					[styles.active]: isActive
				},
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}
