import cn from 'classnames';

import { IBtn } from './btn.types';
import styles from './btn.module.scss';

export function Btn({
	children,
	className,
	disabled,
	appearance = 'primary',
	...props
}: IBtn): JSX.Element {
	switch (appearance) {
		case 'primary':
			return (
				<button
					className={cn(
						styles.btn,
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
		case 'secondary':
			return (
				<button
					className={cn(
						styles.secondaryBtn,
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
		default:
			return <></>;
	}
}
