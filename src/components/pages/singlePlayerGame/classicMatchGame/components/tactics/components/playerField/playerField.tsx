import cn from 'classnames';
import { useDrag } from 'react-dnd';

import { IPlayerFieldProps } from './playerField.interfaces';
import styles from './playerField.module.scss';

export function PlayerField({
	currentPlayer,
	setPositions
}: IPlayerFieldProps) {
	const [{ isDragging }, drag, dragPreview] = useDrag(
		() => ({
			type: 'PLAYER',
			item: currentPlayer,
			end: (item, monitor) => {
				const dropResult = monitor.getDropResult<any>();

				setPositions(s => {
					// console.log('in Player(dropResult, item): ', dropResult, item);

					return s;
				});
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[currentPlayer]
	);

	if (isDragging) {
		return (
			<div
				className={cn(styles.value, {
					[styles.isDragging]: isDragging
				})}
				ref={dragPreview}
			>
				{currentPlayer.number}
			</div>
		);
	}

	return (
		<div className={cn(styles.value)} ref={drag}>
			{currentPlayer.number}
		</div>
	);
}
