import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import styles from './PlayerTable.module.scss';
import { IPlayerTableProps } from './PlayerTable.types';

export const PlayerTable = forwardRef(
	(
		{ children, className, isAvailable, ...props }: IPlayerTableProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		return (
			<div
				ref={ref}
				className={cn(styles.playerInTable, className, {
					[styles.disabled]: isAvailable
				})}
				{...props}
			>
				{children}
			</div>
		);
	}
);
