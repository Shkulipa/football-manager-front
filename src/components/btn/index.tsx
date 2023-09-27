import cn from 'classnames';

import { IBtn } from './Btn.types';
import styles from './Btn.module.scss';

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
						styles.primaryBtn,
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
						styles.btn,
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
