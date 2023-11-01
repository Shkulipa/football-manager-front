import { useDrag } from 'react-dnd';

import { ETypeDragTactics } from '../../constants/type-drag-drop';
import { IDropResult } from '../../types/position.types';

import { PlayerTable } from '@/components/PlayerTable';
import { IPlayerMainTableUserTeamProps } from './PlayerMainTableUserTeam.interfaces';

export function PlayerMainTableUserTeam({
	currentPlayer,
	className
}: IPlayerMainTableUserTeamProps) {
	const [, drag] = useDrag(
		() => ({
			type: ETypeDragTactics.TABLE_MAIN,
			item: currentPlayer,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				if (!dropResult) return;
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[currentPlayer]
	);

	return (
		<PlayerTable ref={drag} className={className}>
			<div>{currentPlayer.number}</div>
			<div>{currentPlayer.name}</div>
		</PlayerTable>
	);
}
