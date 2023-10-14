import cn from 'classnames';
import { useDrag } from 'react-dnd';

import { IPlayerMainTableProps } from './PlayerMainTable.interfaces';
import styles from './PlayerMainTable.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { singleMatchSlice } from '@/pages/SingleMatch/store/single-match.slice';
import { EMatchSide } from '@/constants/match-sides.enum';
import { initStats } from '../../constants/init-stats';
import {
	IMatchDetails,
	IRealPlayerNotMain,
	IReplacement
} from 'footballsimulationengine';
import { limitReplacements } from '@/constants';
import { IPosition } from '../../types/position.types';
import { ETypeDragDrop } from '../../constants/type-drag-drop';

export function PlayerMainTable({
	currentPlayer,
	className,
	...props
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
			type: ETypeDragDrop.PLAYER_MAIN,
			item: currentPlayer,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IPosition>();

				const updatedMatchDetails: IMatchDetails = JSON.parse(
					JSON.stringify(matchDetails)
				);

				// if player make replacement with bench player(drag from main into bench squad)
				if (dropResult && !dropResult.currentPlayer) {
					const benchPlayer = dropResult as unknown as IRealPlayerNotMain;
					const updatedTeam = userTeam.players.map(player => {
						// set new position for current player
						if (player._id === droppedItem._id) {
							return {
								...player,
								...benchPlayer,
								stats: initStats
							};
						}

						return player;
					});

					/**
					 * @info
					 * droppedItem - started selecting by grabbing
					 * dropResult.currentPlayer - player on hover
					 */
					const newReplacement: IReplacement = {
						on: benchPlayer._id,
						off: droppedItem._id
					};
					const replacements = [...userTeam.replacements, newReplacement];

					// update bench
					const filteredBenchSquad = userTeam.bench.filter(
						p => p._id !== benchPlayer._id
					);

					// new bench player (main player that was replaced on player from bench)
					const benchPlayerData: IRealPlayerNotMain = {
						_id: droppedItem._id,
						age: droppedItem.age,
						country: droppedItem.country,
						name: droppedItem.name,
						number: droppedItem.number,
						positions: droppedItem.positions,
						rating: droppedItem.rating,
						skill: droppedItem.skill,
						fitness: droppedItem.fitness,
						injured: droppedItem.injured
					};
					const newBenchSquad = [...filteredBenchSquad, benchPlayerData];

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

				// if player changed the position, and there is a player yet(replacement between players from main squad)
				if (dropResult && dropResult.currentPlayer) {
					let updatedTeam = [];

					// if user want replace player from bench into main squad
					if (!droppedItem.playerID) {
						updatedTeam = userTeam.players.map(player => {
							// set new position for current player
							if (player.playerID === dropResult!.currentPlayer!.playerID) {
								return {
									...player,
									_id: droppedItem._id,
									fitness: droppedItem.fitness,
									injured: droppedItem.injured,
									name: droppedItem.name,
									number: droppedItem.number,
									rating: droppedItem.rating,
									skill: droppedItem.skill,
									stats: droppedItem.stats
								};
							}

							return player;
						});

						if (userFor === EMatchSide.HOSTS) {
							updatedMatchDetails.secondTeam.players = [...updatedTeam];
						} else {
							updatedMatchDetails.kickOffTeam.players = [...updatedTeam];
						}

						dispatch(setMatchDetails(updatedMatchDetails));
						return;
					} else {
						// set new position for current player
						updatedTeam = userTeam.players.map(player => {
							if (player._id === droppedItem._id) {
								return {
									...player,
									_id: player._id,
									stats: initStats,
									originPOS: dropResult.currentPlayer!.originPOS,
									position: dropResult.currentPlayer!.position
								};
							} else if (
								player.playerID === dropResult.currentPlayer!.playerID
							) {
								return {
									...player,
									_id: player._id,
									originPOS: droppedItem.originPOS,
									position: droppedItem.position
								};
							}

							return player;
						});

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
