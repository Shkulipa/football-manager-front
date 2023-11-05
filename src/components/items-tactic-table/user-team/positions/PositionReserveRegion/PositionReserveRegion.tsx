import { useDrop } from 'react-dnd';
import cn from 'classnames';
import { ETypeDragTactics } from '../../../constants/type-drag-drop';
import styles from './PositionReserveRegion.module.scss';
import { IPositionReserveRegionProps } from './PositionReserveRegion.types';
import { PlayerReserveTable } from '../../players/PlayerReserveTable/PlayerReserveTable';
import { useAppSelector } from '@/hooks/redux';

/**
 * @info
 * using in Prepare before the match
 * using in" user team" page, when user move players
 */
export const PositionReserveRegion = ({
	players
}: IPositionReserveRegionProps): JSX.Element => {
	const { secondVersionTeam } = useAppSelector(s => s.userTeamReducer);

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: [
				ETypeDragTactics.FOOTBALL_FIELD,
				ETypeDragTactics.TABLE_MAIN,
				ETypeDragTactics.TABLE_BENCH
			],
			drop: () => ({
				type: ETypeDragTactics.TABLE_RESERVE
			}),
			collect: monitor => ({
				isOver: monitor.isOver()
			})
		}),
		[secondVersionTeam, players]
	);

	const parsePlayers = players.map(p => (
		<PlayerReserveTable key={p._id} player={p} />
	));

	return (
		<div
			className={cn(styles.positionReserveRegionWrapper, {
				[styles.isOver]: isOver
			})}
			ref={drop}
		>
			{parsePlayers}
		</div>
	);
};
