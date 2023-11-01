import cn from 'classnames';
import { useDrop } from 'react-dnd';

import { IPositionBenchTableProps } from './PositionBenchTable.types';
import styles from './PositionBenchTable.module.scss';
import { ETypeDragTactics } from '../../constants/type-drag-drop';
import { PlayerBenchTable } from '../..';

export function PositionBenchTable({
	currentPlayer,
	className,
	...props
}: IPositionBenchTableProps) {
	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: [
				ETypeDragTactics.FOOTBALL_FIELD,
				ETypeDragTactics.TABLE_MAIN,
				ETypeDragTactics.TABLE_BENCH,
				ETypeDragTactics.TABLE_RESERVE
			],
			drop: () => ({
				type: ETypeDragTactics.TABLE_BENCH,
				data: currentPlayer
			}),
			collect: monitor => ({
				isOver: monitor.isOver()
			})
		}),
		[currentPlayer]
	);

	// is Value ?
	const circle = currentPlayer && (
		<PlayerBenchTable
			className={cn({
				[styles.isOver]: isOver
			})}
			currentPlayer={currentPlayer}
		/>
	);

	return (
		<div className={cn(styles.positionTable, className)} ref={drop} {...props}>
			{circle}
		</div>
	);
}
