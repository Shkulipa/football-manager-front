import cn from 'classnames';
import { forwardRef, ForwardedRef } from 'react';
import styles from './PlayerDragField.module.scss';
import { IPlayerDragFieldProps } from './PlayerDragField.types';

export const PlayerDragField = forwardRef(
	(
		{ children, className, isDragging, ...props }: IPlayerDragFieldProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		return (
			<div
				ref={ref}
				className={cn(styles.value, className, {
					[styles.isDragging]: isDragging
				})}
				{...props}
			>
				{children}
			</div>
		);
	}
);
