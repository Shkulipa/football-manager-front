import { PlayerField } from '..';
import cn from 'classnames';
import { useDrop } from 'react-dnd';

import { IPositionProps } from './position.interfaces';
import styles from './position.module.scss';

enum EAccept {
	PLAYER = 'PLAYER'
}

export function Position({
	player,
	className,
	setPositions,
	...props
}: IPositionProps) {
	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'PLAYER',
			drop: () => player,
			collect: monitor => ({
				isOver: monitor.isOver()
			})
		}),
		[]
	);

	// is Value ?
	const { currentPlayer } = player;
	const circle = currentPlayer && (
		<PlayerField currentPlayer={currentPlayer} setPositions={setPositions} />
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
