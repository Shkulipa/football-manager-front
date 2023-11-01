import { useDrag } from 'react-dnd';

import { IPlayerMainTableProps } from './PlayerMainTable.interfaces';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { singleMatchSlice } from '@/layouts/pages/single-match/store/single-match.slice';
import { IMatchDetails, IRealPlayerNotMain } from 'footballsimulationengine';
import { limitReplacements } from '@/constants';

import { ETypeDragTactics } from '../../constants/type-drag-drop';
import { EMatchSide } from '@/constants/footballsimulationengine/match-sides.enum';
import { IDropResult, IDropResultData } from '../../types/position.types';
import { swapPlayers } from '../../utils/swap-players';
import { movePlayer } from '../../utils/move-player';
import { replacePlayer } from '../../utils/replace-player';
import { PlayerTable } from '@/components/PlayerTable';

export function PlayerMainTable({
	currentPlayer,
	className
}: IPlayerMainTableProps) {
	const { name, number, fitness } = currentPlayer;

	const dispatch = useAppDispatch();
	const { setMatchDetails } = singleMatchSlice.actions;
	const { matchDetails, userFor } = useAppSelector(s => s.singleMatchReducer);

	const userTeam =
		userFor === EMatchSide.HOSTS
			? matchDetails!.secondTeam
			: matchDetails!.kickOffTeam;

	const [, drag] = useDrag(
		() => ({
			type: ETypeDragTactics.TABLE_MAIN,
			item: currentPlayer,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				if (!dropResult) return;

				const updatedMatchDetails: IMatchDetails = JSON.parse(
					JSON.stringify(matchDetails)
				);

				/**
				 * @info
				 * if player make replacement from main table into bench(drag from main into bench squad)
				 */
				const isFromMainTableToBenchTable =
					dropResult.type === ETypeDragTactics.TABLE_BENCH &&
					monitor.getItemType() === ETypeDragTactics.TABLE_MAIN;
				if (isFromMainTableToBenchTable) {
					const benchPlayer = dropResult.data as unknown as IRealPlayerNotMain;
					const { updatedTeam, newBenchSquad, replacements } = replacePlayer(
						userTeam,
						droppedItem,
						benchPlayer
					);

					if (userFor === EMatchSide.HOSTS) {
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
					const isPlaceTaken = dropResultData.currentPlayer;
					if (isPlaceTaken) {
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

					/**
					 * @info
					 * from main table into football field where place is empty
					 */
					if (!isPlaceTaken) {
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
				}

				dispatch(setMatchDetails(updatedMatchDetails));
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[currentPlayer, matchDetails]
	);

	/**
	 * if you have another background like additional
	 * see it:
	 * 1. https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_ts/02-drag-around/custom-drag-layer?from-embed=&file=/src/CustomDragLayer.tsx:1522-1572
	 * 2. https://react-dnd.github.io/react-dnd/docs/api/use-drag-layer
	 */

	const isLimitReplacements = userTeam.replacements.length >= limitReplacements;
	const isBenchPlayer = !currentPlayer.stats;
	const isChangedPlayer = userTeam.replacements.find(
		r => r.off === currentPlayer._id
	);

	const isAvailableReplace =
		(isLimitReplacements && isBenchPlayer) || isChangedPlayer;

	const isPossibleDrag = isChangedPlayer ? undefined : drag;

	return (
		<PlayerTable
			ref={isPossibleDrag}
			className={className}
			isAvailable={Boolean(isAvailableReplace)}
		>
			<div>{number}</div>
			<div>{name}</div>
			<div>{fitness}%</div>
		</PlayerTable>
	);
}
