import { PlayerInField, PlayerInTable } from '..';
import cn from 'classnames';
import { useDrop } from 'react-dnd';

import { IPositionInTableProps } from './positionInTable.interfaces';
import styles from './positionInTable.module.scss';

export function PositionInTable({
	position,
	className,
	...props
}: IPositionInTableProps) {
	const { currentPlayer } = position;

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'PLAYER',
			drop: () => position,
			collect: monitor => ({
				isOver: monitor.isOver()
			})
		}),
		[currentPlayer]
	);

	// is Value ?
	const circle = currentPlayer && (
		<PlayerInTable currentPlayer={currentPlayer} />
	);

	return (
		<div
			className={cn(
				styles.positionInTabe,
				{
					[styles.isOver]: isOver
				},
				className
			)}
			ref={drop}
			{...props}
		>
			{circle}
		</div>
	);
}
