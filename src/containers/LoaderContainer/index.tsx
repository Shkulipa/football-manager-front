import cn from 'classnames';
import { ILoaderContainerProps } from './LoaderContainer.types';
import styles from './LoaderContainer.module.scss';

export function LoaderContainer({
	className,
	children,
	...props
}: ILoaderContainerProps): JSX.Element {
	return (
		<div className={cn(styles.loaderContainer, className)} {...props}>
			{children}
		</div>
	);
}
