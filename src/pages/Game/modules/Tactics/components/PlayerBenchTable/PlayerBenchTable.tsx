import cn from 'classnames';
import { useDrag } from 'react-dnd';

import styles from './PlayerBenchTable.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { singleMatchSlice } from '@/pages/SingleMatch/store/single-match.slice';
import { EMatchSide } from '@/constants/match-sides.enum';
import {
	IMatchDetails,
	IRealPlayerNotMain,
	IReplacement
} from 'footballsimulationengine';
import { limitReplacements } from '@/constants';
import { IPosition } from '../../types/position.types';
import { ETypeDragDrop } from '../../constants/type-drag-drop';
import { IPlayerBenchTableProps } from './PlayerBenchTable.interfaces';
import { initStats } from '../../constants/init-stats';

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
			type: ETypeDragDrop.PLAYER_BENCH,
			item: currentPlayer,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<
					IRealPlayerNotMain | IPosition
				>();
				const updatedMatchDetails: IMatchDetails = JSON.parse(
					JSON.stringify(matchDetails)
				);

				const mainPlayer = dropResult as IPosition;
				// if player changed a position(changes between players from bench)
				if (dropResult && !mainPlayer.currentPlayer) {
					const benchPlayer = dropResult as IRealPlayerNotMain;
					const bench = JSON.parse(JSON.stringify(userTeam.bench));
					const p1 = userTeam.bench.findIndex(p => p._id === benchPlayer._id);
					const p2 = userTeam.bench.findIndex(p => p._id === droppedItem._id);

					if (p1 !== -1 && p2 !== -1) {
						[bench[p1], bench[p2]] = [bench[p2], bench[p1]];
					}

					if (userFor === EMatchSide.HOSTS) {
						updatedMatchDetails.secondTeam.bench = [...bench];
					} else {
						updatedMatchDetails.kickOffTeam.bench = [...bench];
					}

					dispatch(setMatchDetails(updatedMatchDetails));
					return;
				}

				// if player changed the position, and there is a player yet
				if (dropResult && mainPlayer.currentPlayer) {
					const updatedTeam = userTeam.players.map(player => {
						// set new position for current player
						if (player.playerID === mainPlayer.currentPlayer!.playerID) {
							if (userFor === EMatchSide.HOSTS) {
								const halfPitchHeight = matchDetails!.pitchSize[1] / 2;
								const x = mainPlayer.coordinates[0];
								const yHosts = mainPlayer.coordinates[1];
								const parseYPosition = halfPitchHeight - yHosts;
								const y = halfPitchHeight + parseYPosition;

								return {
									...player,
									...droppedItem,
									stats: initStats,
									originPOS: [x, y],
									position: mainPlayer.position
								};
							}

							return {
								...player,
								...droppedItem,
								stats: initStats,
								originPOS: mainPlayer.coordinates,
								position: mainPlayer.position
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
						on: droppedItem._id,
						off: mainPlayer.currentPlayer._id
					};
					const replacements = [...userTeam.replacements, newReplacement];

					// update bench
					const filteredBenchSquad = userTeam.bench.filter(
						p => p._id !== droppedItem._id
					);

					const benchPlayerData: IRealPlayerNotMain = {
						_id: mainPlayer.currentPlayer._id,
						age: mainPlayer.currentPlayer.age,
						country: mainPlayer.currentPlayer.country,
						name: mainPlayer.currentPlayer.name,
						number: mainPlayer.currentPlayer.number,
						positions: mainPlayer.currentPlayer.positions,
						rating: mainPlayer.currentPlayer.rating,
						skill: mainPlayer.currentPlayer.skill,
						fitness: mainPlayer.currentPlayer.fitness,
						injured: mainPlayer.currentPlayer.injured
					};
					const newBenchSquad = [...filteredBenchSquad, benchPlayerData];

					if (userFor === EMatchSide.HOSTS) {
						updatedMatchDetails.secondTeam.players = [...updatedTeam];
						updatedMatchDetails.secondTeam.replacements = [...replacements];
						updatedMatchDetails.secondTeam.bench = [...newBenchSquad];
					} else {
						updatedMatchDetails.kickOffTeam.players = [...updatedTeam];
						updatedMatchDetails.kickOffTeam.replacements = [...replacements];
						updatedMatchDetails.kickOffTeam.bench = [...newBenchSquad];
					}

					dispatch(setMatchDetails(updatedMatchDetails));
					return;
				}
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
