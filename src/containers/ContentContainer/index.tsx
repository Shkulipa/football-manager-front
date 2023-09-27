import { IContentContainerProps } from './ContentContainer.types';
import cn from 'classnames';
import styles from './ContentContainer.module.scss';

export function ContentContainer({
	children,
	className,
	...props
}: IContentContainerProps): JSX.Element {
	return (
		<div className={cn(styles.contentContainer, className)} {...props}>
			{children}
		</div>
	);
}
