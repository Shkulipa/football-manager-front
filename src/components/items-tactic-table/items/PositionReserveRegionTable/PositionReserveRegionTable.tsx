import { useDrop } from 'react-dnd';
import cn from 'classnames';
import { ETypeDragTactics } from '../../constants/type-drag-drop';
import styles from './PositionReserveRegionTable.module.scss';
import { IPositionReserveRegionTableProps } from './PositionReserveRegionTable.types';
import { PlayerReserveTable } from '../PlayerReserveTable/PlayerReserveTable';

export const PositionReserveRegionTable = ({
	players
}: IPositionReserveRegionTableProps): JSX.Element => {
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
		[]
	);

	const parsePlayers = players.map(p => (
		<PlayerReserveTable key={p._id} player={p} />
	));

	return (
		<div
			className={cn(styles.positionReserveRegionTableWrapper, {
				[styles.isOver]: isOver
			})}
			ref={drop}
		>
			{parsePlayers}
		</div>
	);
};
