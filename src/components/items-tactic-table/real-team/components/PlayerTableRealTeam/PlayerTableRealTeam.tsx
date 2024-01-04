import cn from 'classnames';
import styles from './PlayerTableRealTeam.module.scss';
import { IPlayerTableRealTeamProps } from './PlayerTableRealTeam.types';
import { PlayerTable } from '@/components/PlayerTable';

export const PlayerTableRealTeam = ({
	children,
	className,
	...props
}: IPlayerTableRealTeamProps): JSX.Element => {
	return (
		<PlayerTable
			{...props}
			ref={null}
			className={cn(styles.playerTableUserTeam, className)}
		>
			{children}
		</PlayerTable>
	);
};
