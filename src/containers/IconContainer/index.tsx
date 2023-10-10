import cn from 'classnames';
import { IIconContainerProps } from './IconContainer.types';
import styles from './IconContainer.module.scss';

export function IconContainer({
	children,
	className,
	direction = 'top',
	...props
}: IIconContainerProps): JSX.Element {
	return (
		<div
			className={cn(
				styles.iconContainer,
				{
					[styles.top]: direction === 'top',
					[styles.down]: direction === 'down',
					[styles.left]: direction === 'left',
					[styles.right]: direction === 'right'
				},
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}
