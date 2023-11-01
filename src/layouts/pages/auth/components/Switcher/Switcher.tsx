import cn from 'classnames';
import { ISwitcherProps } from './Switcher.types';
import styles from './Switcher.module.scss';

export const Switcher = ({
	children,
	className,
	...props
}: ISwitcherProps): JSX.Element => {
	return (
		<div className={cn(styles.switcher, className)} {...props}>
			{children}
		</div>
	);
};
