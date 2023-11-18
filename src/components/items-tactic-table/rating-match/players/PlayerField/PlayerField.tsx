import { useDrag } from 'react-dnd';

import { PlayerDragField } from '@/components';
import { IPlayerFieldProps } from './PlayerField.types';
import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';
import { IDropResult, IDropResultData } from '../../types/position.types';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { ratingMatchSlice } from '@/modules/pages/rating-match/store/rating-match';
import { movePlayer } from '../../utils/move-player';
import { swapPlayers } from '../../utils/swap-players';
import { replacePlayer } from '../../utils/replace-player';
import { IRealPlayerNotMain } from 'footballsimulationengine';

/**
 * @info
 * Player data in field of football field in Rating match page
 */
export function PlayerField({ player }: IPlayerFieldProps) {
	const dispatch = useAppDispatch();
	const { secondUserTeamVersion } = useAppSelector(s => s.ratingMatchReducer);
	const { setSecondUserTeamVersion } = ratingMatchSlice.actions;

	const [{ isDragging }, drag, dragPreview] = useDrag(
		() => ({
			type: ETypeDragTactics.FOOTBALL_FIELD,
			item: player,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				const dropResultType = monitor.getItemType();
				if (!dropResult || !secondUserTeamVersion) return;

				// if user do actions inside football field(change position, swap positions between players inside football field)
				const isFromFootballFieldIntoFootballField =
					dropResult.type === ETypeDragTactics.FOOTBALL_FIELD &&
					dropResultType === ETypeDragTactics.FOOTBALL_FIELD;
				if (isFromFootballFieldIntoFootballField) {
					const dropResultData = dropResult.data as IDropResultData;

					if (dropResultData.player) {
						const dropResultData = dropResult.data as IDropResultData;

						const updatedPlayers = swapPlayers(
							secondUserTeamVersion,
							dropResultData,
							droppedItem
						);

						const updatedTeam = {
							...secondUserTeamVersion,
							players: updatedPlayers
						};

						dispatch(setSecondUserTeamVersion(updatedTeam));
						return;
					}

					if (!dropResultData.player) {
						const dropResultData = dropResult.data as IDropResultData;

						const updatedPlayers = movePlayer(
							secondUserTeamVersion,
							dropResultData,
							droppedItem
						);

						const updatedTeam = {
							...secondUserTeamVersion,
							players: updatedPlayers
						};

						dispatch(setSecondUserTeamVersion(updatedTeam));
						return;
					}
				}

				// if user want change players from football field into main table squad
				const isFromFootballFieldToMainTable =
					dropResult.type === ETypeDragTactics.TABLE_MAIN &&
					monitor.getItemType() === ETypeDragTactics.FOOTBALL_FIELD;
				if (isFromFootballFieldToMainTable) {
					const dropResultData = dropResult.data as IDropResultData;

					const updatedPlayers = swapPlayers(
						secondUserTeamVersion,
						dropResultData,
						droppedItem
					);

					const updatedTeam = {
						...secondUserTeamVersion,
						players: updatedPlayers
					};

					dispatch(setSecondUserTeamVersion(updatedTeam));

					return;
				}

				// if user make replacement from football field into bench
				const isFromFootballFieldToBenchTable =
					dropResult.type === ETypeDragTactics.TABLE_BENCH &&
					monitor.getItemType() === ETypeDragTactics.FOOTBALL_FIELD;
				if (isFromFootballFieldToBenchTable) {
					const dropResultData = dropResult.data as IRealPlayerNotMain;

					const { newMainSquad, newBenchSquad, replacements } = replacePlayer(
						secondUserTeamVersion,
						droppedItem,
						dropResultData
					);

					const updatedTeam = {
						...secondUserTeamVersion,
						players: newMainSquad,
						bench: newBenchSquad,
						replacements
					};

					dispatch(setSecondUserTeamVersion(updatedTeam));

					return;
				}

				return;
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[secondUserTeamVersion, player]
	);

	if (isDragging)
		return (
			<PlayerDragField ref={dragPreview} isDragging={isDragging}>
				{player.number}
			</PlayerDragField>
		);

	return <PlayerDragField ref={drag}>{player.number}</PlayerDragField>;
}
