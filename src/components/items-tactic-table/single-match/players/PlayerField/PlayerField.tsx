import { useDrag } from 'react-dnd';

import { IPlayerInFieldProps } from './PlayerField.types';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { singleMatchSlice } from '@/modules/pages/single-match/store/single-match.slice';
import { IRealPlayerNotMain } from 'footballsimulationengine';
import { EMatchSide } from '@/constants/footballsimulationengine/match-sides.enum';
import { PlayerDragField } from '@/components';
import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';
import { movePlayer } from '@/components/items-tactic-table/single-match/utils/move-player';
import { replacePlayer } from '@/components/items-tactic-table/single-match/utils/replace-player';
import { swapPlayers } from '@/components/items-tactic-table/single-match/utils/swap-players';
import { IDropResult, IDropResultData } from '../../types/position.types';

/**
 * @info
 * Player data in field of football field
 */
export function PlayerField({ player }: IPlayerInFieldProps) {
	const dispatch = useAppDispatch();
	const { setMatchDetails } = singleMatchSlice.actions;

	const { matchDetails, userFor } = useAppSelector(s => s.singleMatchReducer);

	const isUserHosts = userFor === EMatchSide.HOSTS;
	const userTeam = isUserHosts
		? matchDetails!.secondTeam
		: matchDetails!.kickOffTeam;

	const [{ isDragging }, drag, dragPreview] = useDrag(
		() => ({
			type: ETypeDragTactics.FOOTBALL_FIELD,
			item: player,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				if (!dropResult) return;

				const updatedMatchDetails = JSON.parse(JSON.stringify(matchDetails));

				// if user do actions inside football field(change position, swap positions between players inside football field)
				const isActionInsideFootballField =
					dropResult.type === ETypeDragTactics.FOOTBALL_FIELD &&
					monitor.getItemType() === ETypeDragTactics.FOOTBALL_FIELD;
				if (isActionInsideFootballField) {
					const dropResultData = dropResult.data as IDropResultData;
					const isPositionTaken = dropResultData.player;

					// if in another position exist(circle isn't empty) another player(main squad) yet
					if (!isPositionTaken) {
						const dropResultData = dropResult.data as IDropResultData;
						const footballEmptyField = dropResultData;
						const player = droppedItem;

						const updatedTeam = movePlayer(
							userTeam,
							footballEmptyField,
							player
						);

						if (userFor === EMatchSide.HOSTS) {
							updatedMatchDetails.secondTeam.players = [...updatedTeam];
						} else {
							updatedMatchDetails.kickOffTeam.players = [...updatedTeam];
						}

						dispatch(setMatchDetails(updatedMatchDetails));
						return;
					}

					// if in another position is empty(circle is empty), without any player(main squad)
					if (isPositionTaken) {
						const dropResultData = dropResult.data as IDropResultData;

						const updatedTeam = swapPlayers(
							userTeam,
							dropResultData,
							droppedItem
						);

						if (userFor === EMatchSide.HOSTS) {
							updatedMatchDetails.secondTeam.players = [...updatedTeam];
						} else {
							updatedMatchDetails.kickOffTeam.players = [...updatedTeam];
						}

						dispatch(setMatchDetails(updatedMatchDetails));
						return;
					}
				}

				// if user want change players from football field into main table squad
				const isFromFootballFieldToMainTable =
					dropResult.type === ETypeDragTactics.TABLE_MAIN &&
					monitor.getItemType() === ETypeDragTactics.FOOTBALL_FIELD;
				if (isFromFootballFieldToMainTable) {
					const dropResultData = dropResult.data as IDropResultData;

					const updatedTeam = swapPlayers(
						userTeam,
						dropResultData,
						droppedItem
					);

					if (userFor === EMatchSide.HOSTS) {
						updatedMatchDetails.secondTeam.players = [...updatedTeam];
					} else {
						updatedMatchDetails.kickOffTeam.players = [...updatedTeam];
					}

					dispatch(setMatchDetails(updatedMatchDetails));
					return;
				}

				// if user make replacement from football field into bench
				const isFromFootballFieldToBenchTable =
					dropResult.type === ETypeDragTactics.TABLE_BENCH &&
					monitor.getItemType() === ETypeDragTactics.FOOTBALL_FIELD;
				if (isFromFootballFieldToBenchTable) {
					const benchPlayer = dropResult.data as IRealPlayerNotMain;

					const { updatedTeam, newBenchSquad, replacements } = replacePlayer(
						userTeam,
						droppedItem,
						benchPlayer
					);

					if (isUserHosts) {
						updatedMatchDetails.secondTeam.players = [...updatedTeam];
						updatedMatchDetails.secondTeam.bench = [...newBenchSquad];
						updatedMatchDetails.secondTeam.replacements = [...replacements];
					} else {
						updatedMatchDetails.kickOffTeam.players = [...updatedTeam];
						updatedMatchDetails.kickOffTeam.bench = [...newBenchSquad];
						updatedMatchDetails.kickOffTeam.replacements = [...replacements];
					}

					dispatch(setMatchDetails(updatedMatchDetails));
					return;
				}

				dispatch(setMatchDetails(updatedMatchDetails));
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[player, userTeam]
	);

	if (isDragging)
		return (
			<PlayerDragField ref={dragPreview} isDragging={isDragging}>
				{player.number}
			</PlayerDragField>
		);

	return <PlayerDragField ref={drag}>{player.number}</PlayerDragField>;
}
