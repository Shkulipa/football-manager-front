import cn from 'classnames';

import { IPositionFieldProps } from './PositionField.types';
import styles from './PositionField.module.scss';
import { useDragLayer, useDrop } from 'react-dnd';

import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';

import { useAppSelector } from '@/hooks/redux';
import { PlayerField } from '../../players/PlayerField/PlayerField';

/**
 * @info
 * position in field of football field, but when you prepare squad, because
 * here in "accept" was added ETypeDragTactics.TABLE_RESERVE
 *
 * Using in Field of "user team" page
 */
export function PositionField({
	position,
	className,
	...props
}: IPositionFieldProps) {
	const { secondVersionTeam } = useAppSelector(s => s.userTeamReducer);

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
		[secondVersionTeam, position.player]
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
