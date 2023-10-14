import cn from 'classnames';
import { useDrop } from 'react-dnd';

import { IPositionBenchTableProps } from './PositionBenchTable.types';
import styles from './PositionBenchTable.module.scss';
import { ETypeDragDrop } from '../../constants/type-drag-drop';
import { PlayerBenchTable } from '..';

export function PositionBenchTable({
	currentPlayer,
	className,
	...props
}: IPositionBenchTableProps) {
	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: [ETypeDragDrop.PLAYER_MAIN, ETypeDragDrop.PLAYER_BENCH],
			drop: () => currentPlayer,
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
