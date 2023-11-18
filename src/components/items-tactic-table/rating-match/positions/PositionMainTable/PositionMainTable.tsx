import cn from 'classnames';
import { useDrop } from 'react-dnd';

import styles from './PositionMainTable.module.scss';

import { IPositionMainTableProps } from './PositionMainTable.types';
import { PlayerMainTable } from '../../players/PlayerMainTable/PlayerMainTable';
import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';
import { useAppSelector } from '@/hooks/redux';
/**
 * @info
 * position in main table in "user team" page
 * when user move players
 */
export function PositionMainTable({
	position,
	className,
	...props
}: IPositionMainTableProps) {
	const { position: positionName, player } = position;
	const { secondUserTeamVersion } = useAppSelector(s => s.ratingMatchReducer);

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: [
				ETypeDragTactics.FOOTBALL_FIELD,
				ETypeDragTactics.TABLE_MAIN,
				ETypeDragTactics.TABLE_BENCH
			],
			drop: () => ({
				type: ETypeDragTactics.TABLE_MAIN,
				data: position
			}),
			collect: monitor => ({
				isOver: monitor.isOver()
			})
		}),
		[secondUserTeamVersion, player, positionName]
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
