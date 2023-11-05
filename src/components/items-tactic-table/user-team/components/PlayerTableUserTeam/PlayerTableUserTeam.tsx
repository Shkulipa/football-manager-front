import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import styles from './PlayerTableUserTeam.module.scss';
import { IPlayerTableUserTeamProps } from './PlayerTableUserTeam.types';
import { PlayerTable } from '@/components/PlayerTable';

/**
 * @info
 * Player component
 */
export const PlayerTableUserTeam = forwardRef(
	(
		{ children, className, ...props }: IPlayerTableUserTeamProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		return (
			<PlayerTable
				{...props}
				ref={ref}
				className={cn(styles.playerTableUserTeam, className)}
			>
				{children}
			</PlayerTable>
		);
	}
);
