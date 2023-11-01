import cn from 'classnames';

import { IButtonProps } from './Button.types';
import styles from './Button.module.scss';

export function Button({
	children,
	className,
	disabled,
	appearance = 'primary',
	isLoading,
	type = 'button',
	...props
}: IButtonProps): JSX.Element {
	const loading = isLoading ? 'Loading...' : children;

	const commonProps = {
		type,
		disabled: isLoading || disabled
	};

	switch (appearance) {
		case 'primary':
			return (
				<button
					className={cn(styles.btn, styles.primaryBtn, className)}
					{...commonProps}
					{...props}
				>
					{loading}
				</button>
			);
		case 'secondary':
			return (
				<button
					className={cn(styles.btn, styles.secondaryBtn, className)}
					{...commonProps}
					{...props}
				>
					{loading}
				</button>
			);
		default:
			return <></>;
	}
}
