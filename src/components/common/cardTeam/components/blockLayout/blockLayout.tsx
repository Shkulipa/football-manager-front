import cn from 'classnames';

import { IBlockLayoutProps } from './blockLayout.interfaces';
import styles from './blockLayout.module.scss';

export function BlockLayout({
	children,
	className,
	...props
}: IBlockLayoutProps) {
	return (
		<div className={cn(styles.block, className)} {...props}>
			{children}
		</div>
	);
}
