import cn from 'classnames';
import { useDrag } from 'react-dnd';

import styles from './PlayerBenchTable.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { singleMatchSlice } from '@/pages/SingleMatch/store/single-match.slice';
import { IMatchDetails } from 'footballsimulationengine';
import { limitReplacements } from '@/constants';
import { IDropResult, IDropResultData } from '../../types/position.types';
import { ETypeDragTactics } from '../../constants/type-drag-drop';
import { IPlayerBenchTableProps } from './PlayerBenchTable.interfaces';
import { EMatchSide } from '@/constants/footballsimulationengine/match-sides.enum';
import { replacePlayer } from '../../utils/replace-player';

export function PlayerBenchTable({
	currentPlayer,
	className,
	...props
}: IPlayerBenchTableProps) {
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
			type: ETypeDragTactics.TABLE_BENCH,
			item: currentPlayer,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				if (!dropResult) return;

				const updatedMatchDetails: IMatchDetails = JSON.parse(
					JSON.stringify(matchDetails)
				);

				/**
				 * @info
				 * if user try move player from bench in Football Field where circle is empty
				 */
				const isFromBenchToFootballField =
					dropResult.type === ETypeDragTactics.FOOTBALL_FIELD &&
					monitor.getItemType() === ETypeDragTactics.TABLE_BENCH;
				if (isFromBenchToFootballField) {
					const dropResultData = dropResult.data as IDropResultData;
					const isTakenPosition = dropResultData.currentPlayer;

					/**
					 * @info
					 * into circle with player(taken position)
					 */
					if (isTakenPosition) {
						const dropResultData = dropResult.data as IDropResultData;
						const mainPlayer = dropResultData.currentPlayer;
						const benchPlayer = droppedItem;
						const { updatedTeam, newBenchSquad, replacements } = replacePlayer(
							userTeam,
							mainPlayer,
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
					const mainPlayer = dropResultData.currentPlayer;
					const benchPlayer = droppedItem;

					const { updatedTeam, newBenchSquad, replacements } = replacePlayer(
						userTeam,
						mainPlayer,
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

				return;
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
	const isChangedPlayer = userTeam.replacements.find(
		r => r.off === currentPlayer._id
	);

	const isAvailableReplace = isLimitReplacements || isChangedPlayer;

	const isPossibleDrag = isChangedPlayer ? undefined : drag;

	return (
		<div
			ref={isPossibleDrag}
			className={cn(styles.playerInTable, className, {
				[styles.disabled]: isAvailableReplace
			})}
			{...props}
		>
			<div>{number}</div>
			<div>{name}</div>
			<div>{fitness}%</div>
		</div>
	);
}
