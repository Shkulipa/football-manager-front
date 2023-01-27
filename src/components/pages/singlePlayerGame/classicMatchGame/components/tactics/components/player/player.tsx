import cn from 'classnames';
import { useDrag } from 'react-dnd';

import { IPlayerProps } from './player.interfaces';
import styles from './player.module.scss';

export function Player({ player, className, ...props }: IPlayerProps) {
	const { name } = player;

	const [{ isDragging }, drag, dragPreview] = useDrag(
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

	/**
	 * if you have another background like additional
	 * see it:
	 * 1. https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_ts/02-drag-around/custom-drag-layer?from-embed=&file=/src/CustomDragLayer.tsx:1522-1572
	 * 2. https://react-dnd.github.io/react-dnd/docs/api/use-drag-layer
	 */

	return (
		<div ref={drag} className={cn(className)} {...props}>
			<div className={cn(styles.player)}>{name}</div>
		</div>
	);
}
