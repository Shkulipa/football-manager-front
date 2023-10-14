import cn from 'classnames';
import { useDrag } from 'react-dnd';

import { IPlayerInFieldProps } from './PlayerField.types';
import styles from './PlayerField.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { singleMatchSlice } from '@/pages/SingleMatch/store/single-match.slice';
import { EMatchSide } from '@/constants/match-sides.enum';
import { ETypeDragDrop } from '../../constants/type-drag-drop';
import { IPosition } from '../../types/position.types';
import { IRealPlayerNotMain, IReplacement } from 'footballsimulationengine';
import { initStats } from '../../constants/init-stats';

/**
 * @info
 * Player data in field of football field
 */
export function PlayerField({ currentPlayer }: IPlayerInFieldProps) {
	const dispatch = useAppDispatch();
	const { setMatchDetails } = singleMatchSlice.actions;

	const { matchDetails, userFor } = useAppSelector(s => s.singleMatchReducer);

	const userTeam =
		userFor === EMatchSide.HOSTS
			? matchDetails!.secondTeam
			: matchDetails!.kickOffTeam;

	const [{ isDragging }, drag, dragPreview] = useDrag(
		() => ({
			type: ETypeDragDrop.PLAYER_MAIN,
			item: currentPlayer,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IPosition>();
				const updatedMatchDetails = JSON.parse(JSON.stringify(matchDetails));

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

				// if player changed the position, and there is a player yet
				if (dropResult && dropResult.currentPlayer) {
					const updatedTeam = userTeam.players.map((player: any) => {
						// set new position for current player
						if (player.playerID === droppedItem.playerID) {
							return {
								...player,
								originPOS: dropResult.currentPlayer!.originPOS,
								position: dropResult.currentPlayer!.position
							};
						} else if (player.playerID === dropResult.currentPlayer!.playerID) {
							return {
								...player,
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
				}

				dispatch(setMatchDetails(updatedMatchDetails));
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[currentPlayer, userTeam]
	);

	if (isDragging) {
		return (
			<div
				className={cn(styles.value, {
					[styles.isDragging]: isDragging
				})}
				ref={dragPreview}
			>
				{currentPlayer.number}
			</div>
		);
	}

	return (
		<div className={cn(styles.value)} ref={drag}>
			{currentPlayer.number}
		</div>
	);
}
