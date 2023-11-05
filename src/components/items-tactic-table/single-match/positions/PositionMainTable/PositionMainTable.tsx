import cn from 'classnames';
import { useDrop } from 'react-dnd';
import { IPositionInTableProps } from './PositionMainTable.types';
import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';
import { PlayerMainTable } from '../../players/PlayerMainTable/PlayerMainTable';
import styles from './PositionMainTable.module.scss';

/**
 * @info
 * position in main table in match
 * using in Single match page
 */
export function PositionMainTable({
	position,
	className,
	...props
}: IPositionInTableProps) {
	const { position: positionName, player } = position;

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: [
				ETypeDragTactics.FOOTBALL_FIELD,
				ETypeDragTactics.TABLE_MAIN,
				ETypeDragTactics.TABLE_BENCH,
				ETypeDragTactics.TABLE_RESERVE
			],
			drop: () => ({
				type: ETypeDragTactics.TABLE_MAIN,
				data: position
			}),
			collect: monitor => ({
				isOver: monitor.isOver()
			})
		}),
		[player]
	);

	// is Value ?
	const circle = player && (
		<PlayerMainTable
			className={cn({
				[styles.isOver]: isOver
			})}
			player={player}
		/>
	);

	return (
		<div className={cn(styles.positionTable, className)} ref={drop} {...props}>
			<div className={styles.position}>{positionName}</div>
			<div className={styles.player}>{circle}</div>
		</div>
	);
}
