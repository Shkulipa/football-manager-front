import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { IButtonMenuProps } from './buttonMenu.interfaces';
import styles from './buttonMenu.module.scss';

export function ButtonMenu({
	className,
	children,
	...props
}: IButtonMenuProps) {
	return (
		<NavLink className={cn(styles.buttonMenu, className)} {...props}>
			{children}
		</NavLink>
	);
}
