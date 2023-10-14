import cn from 'classnames';
import { useDrop } from 'react-dnd';

import { IPositionInTableProps } from './PositionMainTable.types';
import styles from './PositionMainTable.module.scss';
import { PlayerMainTable } from '..';
import { ETypeDragDrop } from '../../constants/type-drag-drop';

export function PositionMainTable({
	position,
	className,
	...props
}: IPositionInTableProps) {
	const { position: positionName, currentPlayer } = position;

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: [ETypeDragDrop.PLAYER_MAIN, ETypeDragDrop.PLAYER_BENCH],
			drop: () => position,
			collect: monitor => ({
				isOver: monitor.isOver()
			})
		}),
		[currentPlayer]
	);

	// is Value ?
	const circle = currentPlayer && (
		<PlayerMainTable
			className={cn({
				[styles.isOver]: isOver
			})}
			currentPlayer={currentPlayer}
		/>
	);

	return (
		<div className={cn(styles.positionTable, className)} ref={drop} {...props}>
			<div className={styles.position}>{positionName}</div>
			<div className={styles.player}>{circle}</div>
		</div>
	);
}
