import cn from 'classnames';

import { ITitleProps } from './title.interfaces';
import styles from './title.module.scss';

export function Title({ className, children, ...props }: ITitleProps) {
	return (
		<div className={cn(styles.title, className)} {...props}>
			{children}
		</div>
	);
}
