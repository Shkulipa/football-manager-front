import cn from 'classnames';
import { DragPre, useDrag } from 'react-dnd';

import { IPlayerFieldProps } from './playerField.interfaces';
import styles from './playerField.module.scss';

export function PlayerField({ currentPlayer }: IPlayerFieldProps) {
	const [{ isDragging }, drag, preview] = useDrag(
		() => ({
			type: 'PLAYER',
			item: currentPlayer,
			end: (item, monitor) => {
				const dropResult = monitor.getDropResult<any>();

				// console.log('in Player(dropResult, item): ', dropResult, item);
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[currentPlayer]
	);

	return (
		<div className={cn(styles.value)} ref={drag}>
			{/* <div className={styles.content}>{currentPlayer.name}</div> */}
			{currentPlayer.number}
		</div>
	);
}
