import { PlayerInField } from '..';
import cn from 'classnames';
import { useDrop } from 'react-dnd';

import { IPositionProps } from './position.interfaces';
import styles from './position.module.scss';

export function Position({ position, className, ...props }: IPositionProps) {
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
		<PlayerInField currentPlayer={currentPlayer} />
	);

	return (
		<div
			className={cn(
				styles.position,
				{
					[styles.dicoration]: !currentPlayer,
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
