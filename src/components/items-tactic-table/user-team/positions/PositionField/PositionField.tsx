import cn from 'classnames';

import { IPositionFieldProps } from './PositionField.types';
import styles from './PositionField.module.scss';
import { useDragLayer, useDrop } from 'react-dnd';

import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';
import { PlayerField } from '../../players/PlayerField/PlayerField';
import { useAppSelector } from '@/hooks/redux';

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
				ETypeDragTactics.TABLE_BENCH,
				ETypeDragTactics.TABLE_RESERVE
			],
			drop: () => ({
				type: ETypeDragTactics.FOOTBALL_FIELD,
				data: position
			}),
			canDrop(_, monitor) {
				const isBench = monitor.getItemType() === ETypeDragTactics.TABLE_BENCH;
				const isReserve =
					monitor.getItemType() === ETypeDragTactics.TABLE_RESERVE;

				const countPlayersInField = Object.entries(
					secondVersionTeam?.main || []
				);
				const fieldIsTaken = position.player;
				if (
					countPlayersInField.length === 11 &&
					!fieldIsTaken &&
					(isBench || isReserve)
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
