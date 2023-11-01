import { useDrag } from 'react-dnd';

import { ETypeDragTactics } from '../../constants/type-drag-drop';
import { IDropResult } from '../../types/position.types';
import { PlayerDragField } from '@/components';
import { IPlayerFieldUserTeamProps } from './PlayerFieldUserTeam.types';

/**
 * @info
 * Player data in field of football field in User team page
 */
export function PlayerFieldUserTeam({
	currentPlayer
}: IPlayerFieldUserTeamProps) {
	const [{ isDragging }, drag, dragPreview] = useDrag(
		() => ({
			type: ETypeDragTactics.FOOTBALL_FIELD,
			item: currentPlayer,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				if (!dropResult) return;
				// console.log('droppedItem', droppedItem);
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[currentPlayer]
	);

	if (isDragging)
		return (
			<PlayerDragField ref={dragPreview} isDragging={isDragging}>
				{currentPlayer.number}
			</PlayerDragField>
		);

	return <PlayerDragField ref={drag}>{currentPlayer.number}</PlayerDragField>;
}
