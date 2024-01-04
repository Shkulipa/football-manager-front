import cn from 'classnames';
import { ICenterContainerProps } from './CenterContainer.types';
import styles from './CenterContainer.module.scss';

export function CenterContainer({
	className,
	children,
	...props
}: ICenterContainerProps): JSX.Element {
	return (
		<div className={cn(styles.centerContainer, className)} {...props}>
			{children}
		</div>
	);
}
