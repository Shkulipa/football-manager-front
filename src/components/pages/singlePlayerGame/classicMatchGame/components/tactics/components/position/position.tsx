import { PlayerField } from '..';
import cn from 'classnames';
import { useDrop } from 'react-dnd';

import { IPositionProps } from './position.interfaces';
import styles from './position.module.scss';

enum EAccept {
	PLAYER = 'PLAYER'
}

export function Position({ player, className, ...props }: IPositionProps) {
	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'PLAYER',
			drop: () => {
				// console.log('droped: ', player);
				return player;
			},
			collect: monitor => ({
				isOver: monitor.isOver()
			})
		}),
		[player]
	);

	// is Value ?
	const { currentPlayer } = player;
	const circle = currentPlayer && <PlayerField currentPlayer={currentPlayer} />;

	return (
		<div
			className={cn(
				styles.position,
				{
					[styles.dicoration]: !currentPlayer
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
