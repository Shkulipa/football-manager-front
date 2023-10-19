import cn from 'classnames';

import { IBtn } from './Button.types';
import styles from './Button.module.scss';

export function Button({
	children,
	className,
	disabled,
	appearance = 'primary',
	isLoading,
	...props
}: IBtn): JSX.Element {
	const loading = isLoading ? 'Loading...' : children;

	switch (appearance) {
		case 'primary':
			return (
				<button
					className={cn(styles.btn, styles.primaryBtn, className)}
					disabled={isLoading || disabled}
					{...props}
				>
					{loading}
				</button>
			);
		case 'secondary':
			return (
				<button
					className={cn(styles.btn, styles.secondaryBtn, className)}
					disabled={isLoading || disabled}
					{...props}
				>
					{loading}
				</button>
			);
		default:
			return <></>;
	}
}
