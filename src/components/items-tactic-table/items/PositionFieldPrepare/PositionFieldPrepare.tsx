import cn from 'classnames';

import { IPositionFieldPrepareProps } from './PositionFieldPrepare.types';
import styles from './PositionFieldPrepare.module.scss';
import { useDragLayer, useDrop } from 'react-dnd';
import { ETypeDragTactics } from '../../constants/type-drag-drop';
import { PlayerFieldUserTeam } from '../PlayerFieldUserTeam/PlayerFieldUserTeam';

/**
 * @info
 * position in field of football field, but when you prepare squad, because
 * here in "accept" was added ETypeDragTactics.TABLE_RESERVE
 */
export function PositionFieldPrepare({
	position,
	className,
	...props
}: IPositionFieldPrepareProps) {
	const { isDragging } = useDragLayer(monitor => ({
		isDragging: monitor.isDragging()
	}));

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: [
				ETypeDragTactics.FOOTBALL_FIELD,
				ETypeDragTactics.TABLE_MAIN,
				ETypeDragTactics.TABLE_BENCH,
				ETypeDragTactics.TABLE_RESERVE
			],
			drop: () => ({
				type: ETypeDragTactics.FOOTBALL_FIELD,
				data: position
			}),
			canDrop() {
				return true;
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop()
			})
		}),
		[position?.currentPlayer]
	);

	if (isDragging && !canDrop) return <></>;

	// is Value ?
	const circle = position?.currentPlayer && (
		<PlayerFieldUserTeam currentPlayer={position.currentPlayer} />
	);

	return (
		<div
			className={cn(
				styles.position,
				{
					[styles.decoration]: !position?.currentPlayer,
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
