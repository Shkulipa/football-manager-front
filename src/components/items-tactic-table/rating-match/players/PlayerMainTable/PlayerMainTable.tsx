import { useDrag } from 'react-dnd';

import { IPlayerMainTableUserTeamProps } from './PlayerMainTable.interfaces';
import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IDropResult, IDropResultData } from '../../types/position.types';
import { PlayerTable } from '@/components/PlayerTable';
import { IRealPlayerNotMain } from 'footballsimulationengine';
import { replacePlayer } from '../../utils/replace-player';
import { ratingMatchSlice } from '@/modules/pages/rating-match/store/rating-match';
import { swapPlayers } from '../../utils/swap-players';

export function PlayerMainTable({
	player,
	className
}: IPlayerMainTableUserTeamProps) {
	const dispatch = useAppDispatch();
	const { secondUserTeamVersion } = useAppSelector(s => s.ratingMatchReducer);
	const { setSecondUserTeamVersion } = ratingMatchSlice.actions;

	const [, drag] = useDrag(
		() => ({
			type: ETypeDragTactics.TABLE_MAIN,
			item: player,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				const dropResultType = monitor.getItemType();
				if (!dropResult || !secondUserTeamVersion) return;

				/**
				 * @info
				 * if player make replacement from main table into bench(drag from main into bench squad)
				 */
				const isFromMainTableToBenchTable =
					dropResult.type === ETypeDragTactics.TABLE_BENCH &&
					dropResultType === ETypeDragTactics.TABLE_MAIN;
				if (isFromMainTableToBenchTable) {
					const benchPlayer = dropResult.data as IRealPlayerNotMain;

					const { newMainSquad, newBenchSquad, replacements } = replacePlayer(
						secondUserTeamVersion,
						droppedItem,
						benchPlayer
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

				/**
				 * @info
				 * if player changed position, and there is a player yet
				 * changing position between from main table squad into football field
				 * and changing position between players in main table squad
				 */
				const isFromMainTableToFootballField =
					(dropResult.type === ETypeDragTactics.FOOTBALL_FIELD ||
						dropResult.type === ETypeDragTactics.TABLE_MAIN) &&
					monitor.getItemType() === ETypeDragTactics.TABLE_MAIN;
				if (isFromMainTableToFootballField) {
					const dropResultData = dropResult.data as IDropResultData;

					// from main table into football field where is places a player yet
					const isPlaceTaken = dropResultData.player;
					if (isPlaceTaken) {
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

					/**
					 * @info
					 * from main table into football field where place is empty
					 */
					if (!isPlaceTaken) {
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
				}

				return;
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[secondUserTeamVersion, player]
	);

	return (
		<PlayerTable ref={drag} className={className}>
			<div>{player.number}</div>
			<div>{player.name}</div>
			<div>{player.fitness}%</div>
		</PlayerTable>
	);
}
