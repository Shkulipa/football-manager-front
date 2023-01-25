import cn from 'classnames';

import { IButton } from './button.interface';
import styles from './button.module.scss';

export function Button({ children, className, ...props }: IButton) {
	return (
		<button className={cn(styles.button, className)} {...props}>
			{children}
		</button>
	);
}
