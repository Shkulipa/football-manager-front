import cn from 'classnames';

import styles from './PositionField.module.scss';
import { useDragLayer, useDrop } from 'react-dnd';
import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';
import { PlayerField } from '../../players/PlayerField/PlayerField';
import { IPositionFieldProps } from './PositionField.types';

/**
 * @info
 * position in field of football field in match
 *
 * Using in single match
 */
export function PositionField({
	position,
	className,
	...props
}: IPositionFieldProps) {
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
				/**
				 * drop on the field player from bench in empty Field
				 * it is protect from +11 players on the field in the same time
				 */
				if (
					monitor.getItemType() === ETypeDragTactics.TABLE_BENCH &&
					!position.player
				)
					return false;
				return true;
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop()
			})
		}),
		[position?.player]
	);

	if (isDragging && !canDrop) return <></>;

	// is Value ?
	const circle = position?.player && <PlayerField player={position.player} />;

	return (
		<div
			className={cn(
				styles.position,
				{
					[styles.decoration]: !position?.player,
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
