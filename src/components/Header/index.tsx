import cn from 'classnames';
import styles from './Header.module.scss';
import { IHeaderProps } from './Header.types';
import { ForwardedRef, forwardRef } from 'react';

export const Header = forwardRef(
	(
		{ children, className, ...props }: IHeaderProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		return (
			<header ref={ref} className={cn(styles.header, className)} {...props}>
				{children}
			</header>
		);
	}
);
