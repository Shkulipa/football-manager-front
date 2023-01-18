import cn from 'classnames';

import { IButtonIconProps } from './buttonIcon.interfaces';
import styles from './buttonIcon.module.scss';

export function ButtonIcon({
	className,
	children,
	disabled,
	...props
}: IButtonIconProps) {
	return (
		<button
			className={cn(
				styles.buttonIcon,
				{
					[styles.disabled]: disabled
				},
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
