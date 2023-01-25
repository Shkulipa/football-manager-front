import cn from 'classnames';
import { useDrag } from 'react-dnd';

import { IPlayerProps } from './player.interfaces';
import styles from './player.module.scss';

export function Player({ player, className, ...props }: IPlayerProps) {
	const { name } = player;

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: 'PLAYER',
			item: { name },
			end: (item, monitor) => {
				const dropResult = monitor.getDropResult<any>();

				// console.log('in Player(dropResult, item): ', dropResult, item);
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[player]
	);

	return (
		<div ref={drag} className={cn(className)} {...props}>
			<div className={cn(styles.player)}>{name}</div>
		</div>
	);
}
