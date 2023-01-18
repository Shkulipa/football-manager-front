import cn from 'classnames';

import { IPrimaryLayoutProps } from './primaryLayout.interfaces';
import styles from './primaryLayout.module.scss';

export function PrimaryLayout({
	children,
	className,
	...props
}: IPrimaryLayoutProps) {
	return (
		<div className={cn(styles.primaryLayout, className)} {...props}>
			{children}
		</div>
	);
}
