import cn from 'classnames';

import { IErrorMsg } from './ErrorMsg.types';
import styles from './ErrorMsg.module.scss';

export function ErrorMsg({
	children,
	className,
	...props
}: IErrorMsg): JSX.Element {
	return (
		<div className={cn(styles.errorMsg, className)} {...props}>
			{children}
		</div>
	);
}
