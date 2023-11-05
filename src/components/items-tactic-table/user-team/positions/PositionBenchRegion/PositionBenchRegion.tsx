import { useDrop } from 'react-dnd';
import cn from 'classnames';
import { ETypeDragTactics } from '../../../constants/type-drag-drop';
import styles from './PositionBenchRegion.module.scss';
import { IPositionBenchRegionProps } from './PositionBenchRegion.types';
import { PlayerBenchTable } from '../../players/PlayerBenchTable/PlayerBenchTable';
import { useAppSelector } from '@/hooks/redux';
import { limitBenchPlayers } from '@/constants';

export const PositionBenchRegion = ({
	players
}: IPositionBenchRegionProps): JSX.Element => {
	const { secondVersionTeam } = useAppSelector(s => s.userTeamReducer);

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: [
				ETypeDragTactics.FOOTBALL_FIELD,
				ETypeDragTactics.TABLE_MAIN,
				ETypeDragTactics.TABLE_RESERVE
			],
			drop: () => ({
				type: ETypeDragTactics.TABLE_BENCH
			}),
			collect: monitor => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop()
			})
		}),
		[secondVersionTeam, players]
	);

	const parsePlayers = players.map(p => (
		<PlayerBenchTable key={p._id} player={p} />
	));

	const isLimitBenchPlayers =
		(secondVersionTeam?.bench || []).length === limitBenchPlayers;
	const dropRef = !isLimitBenchPlayers ? drop : null;

	return (
		<div
			className={cn(styles.positionBenchRegionWrapper, {
				[styles.isOver]: isOver,
				[styles.isBlocked]: isLimitBenchPlayers
			})}
			ref={dropRef}
		>
			{parsePlayers}
		</div>
	);
};
