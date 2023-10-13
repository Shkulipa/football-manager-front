import { IPaddingContainerProps } from './PaddingContainer.types';
import cn from 'classnames';
import styles from './PaddingContainer.module.scss';

export function PaddingContainer({
	children,
	className,
	...props
}: IPaddingContainerProps): JSX.Element {
	return (
		<div className={cn(styles.paddingContainer, className)} {...props}>
			{children}
		</div>
	);
}
