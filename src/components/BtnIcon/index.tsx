import cn from 'classnames';

import { IBtnIcon } from './BtnIcon.types';
import styles from './BtnIcon.module.scss';

export function BtnIcon({
	children,
	className,
	...props
}: IBtnIcon): JSX.Element {
	return (
		<button className={cn(styles.btnIcon, className)} {...props}>
			{children}
		</button>
	);
}
