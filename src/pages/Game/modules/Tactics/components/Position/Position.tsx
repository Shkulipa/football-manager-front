import cn from 'classnames';

import { IPositionProps } from './Position.types';
import styles from './Position.module.scss';
import { PlayerField } from '../PlayerField/PlayerField';
import { useDragLayer, useDrop } from 'react-dnd';
import { ETypeDragTactics } from '../../constants/type-drag-drop';

/**
 * @info
 * position in field of football field
 */
export function Position({ position, className, ...props }: IPositionProps) {
	const { isDragging } = useDragLayer(monitor => ({
		isDragging: monitor.isDragging()
	}));

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: [
				ETypeDragTactics.FOOTBALL_FIELD,
				ETypeDragTactics.TABLE_MAIN,
				ETypeDragTactics.TABLE_BENCH
			],
			drop: () => ({
				type: ETypeDragTactics.FOOTBALL_FIELD,
				data: position
			}),
			canDrop(_, monitor) {
				if (
					monitor.getItemType() === ETypeDragTactics.TABLE_BENCH &&
					!position.currentPlayer
				)
					return false;
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
		<PlayerField currentPlayer={position.currentPlayer} />
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
