import { useDrag } from 'react-dnd';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { limitReplacements } from '@/constants';
import { IPlayerBenchTableProps } from './PlayerBenchTable.interfaces';
import { PlayerTable } from '@/components/PlayerTable';
import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';
import { IDropResult, IDropResultData } from '../../types/position.types';
import { replacePlayer } from '../../utils/replace-player';
import { ratingMatchSlice } from '@/modules/pages/rating-match/store/rating-match';

export function PlayerBenchTable({
	player,
	className
}: IPlayerBenchTableProps) {
	const { name, number, fitness } = player;

	const dispatch = useAppDispatch();
	const { secondUserTeamVersion } = useAppSelector(s => s.ratingMatchReducer);
	const { setSecondUserTeamVersion } = ratingMatchSlice.actions;

	const [, drag] = useDrag(
		() => ({
			type: ETypeDragTactics.TABLE_BENCH,
			item: player,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				if (!dropResult || !secondUserTeamVersion) return;

				/**
				 * @info
				 * if user try move player from bench in Football Field where circle is empty
				 */
				const isFromBenchToFootballField =
					dropResult.type === ETypeDragTactics.FOOTBALL_FIELD &&
					monitor.getItemType() === ETypeDragTactics.TABLE_BENCH;
				if (isFromBenchToFootballField) {
					const dropResultData = dropResult.data as IDropResultData;
					const isTakenPosition = dropResultData.player;

					/**
					 * @info
					 * into circle with player(taken position)
					 */
					if (isTakenPosition) {
						const dropResultData = dropResult.data as IDropResultData;
						const mainPlayer = dropResultData.player;
						const benchPlayer = droppedItem;

						const { newMainSquad, newBenchSquad, replacements } = replacePlayer(
							secondUserTeamVersion,
							mainPlayer,
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
					 * into empty circle(isn't taken position)
					 */
					if (!isTakenPosition) {
						return;
					}
				}

				/**
				 * @info
				 * if user drag from Bench Table into Main Table
				 */
				const isFromBenchToMainTable =
					dropResult.type === ETypeDragTactics.TABLE_MAIN &&
					monitor.getItemType() === ETypeDragTactics.TABLE_BENCH;
				if (isFromBenchToMainTable) {
					const dropResultData = dropResult.data as IDropResultData;
					const mainPlayer = dropResultData.player;
					const benchPlayer = droppedItem;

					const { newMainSquad, newBenchSquad, replacements } = replacePlayer(
						secondUserTeamVersion,
						mainPlayer,
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

				return;
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

	const isLimitReplacements =
		secondUserTeamVersion &&
		secondUserTeamVersion.replacements.length >= limitReplacements;
	const isChangedPlayer =
		secondUserTeamVersion &&
		secondUserTeamVersion.replacements.find(r => r.off === player._id);

	const isAvailableReplace = isLimitReplacements || isChangedPlayer;

	const isPossibleDrag = isAvailableReplace ? undefined : drag;

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
