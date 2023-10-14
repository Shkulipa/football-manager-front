import cn from 'classnames';

import { IPositionProps } from './Position.types';
import styles from './Position.module.scss';
import { PlayerField } from '../PlayerField/PlayerField';
import { useDrop } from 'react-dnd';
import { ETypeDragDrop } from '../../constants/type-drag-drop';

/**
 * @info
 * position in field of football field
 */
export function Position({ position, className, ...props }: IPositionProps) {
	const { currentPlayer } = position;

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
	const circle = currentPlayer && <PlayerField currentPlayer={currentPlayer} />;

	return (
		<div
			className={cn(
				styles.position,
				{
					[styles.decoration]: !currentPlayer,
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
