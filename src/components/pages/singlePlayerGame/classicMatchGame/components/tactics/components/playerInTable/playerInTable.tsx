import cn from 'classnames';
import { useDrag } from 'react-dnd';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { EUserFor, matchSlice } from 'src/store/slices';

import { IPlayerInTableProps } from './playerInTable.interfaces';
import styles from './playerInTable.module.scss';

export function PlayerInTable({
	currentPlayer,
	className,
	...props
}: IPlayerInTableProps) {
	const { name, number, fitness } = currentPlayer;

	const dispatch = useAppDispatch();
	const { setMatchDetails, setGuests, setHosts } = matchSlice.actions;
	const { matchDetails, userFor, pitchSize, hosts, guests } = useAppSelector(
		s => s.match
	);
	const userTeam =
		userFor === EUserFor.HOSTS
			? matchDetails.secondTeam
			: matchDetails.kickOffTeam;

	const [, drag] = useDrag(
		() => ({
			type: 'PLAYER',
			item: currentPlayer,
			end: (dropedItem, monitor) => {
				const dropResult = monitor.getDropResult<any>();
				const updatedMatchDetails = JSON.parse(JSON.stringify(matchDetails));

				// if player changed a position
				if (dropResult && !dropResult.currentPlayer) {
					const updatedTeam = userTeam.players.map((player: any) => {
						// set new position for current player
						if (player.playerID === dropedItem.playerID) {
							if (userFor === EUserFor.HOSTS) {
								const halfPitchHeight = pitchSize.pitchHeight / 2;
								const x = dropResult.coordinates[0];
								const yHosts = dropResult.coordinates[1];
								const parseYPosition = halfPitchHeight - yHosts;
								const y = halfPitchHeight + parseYPosition;

								return {
									...player,
									originPOS: [x, y],
									position: dropResult.position
								};
							}

							return {
								...player,
								originPOS: dropResult.coordinates,
								position: dropResult.position
							};
						}

						return player;
					});

					if (userFor === EUserFor.HOSTS) {
						updatedMatchDetails.secondTeam.players = [...updatedTeam];
					} else {
						updatedMatchDetails.kickOffTeam.players = [...updatedTeam];
					}
				}

				// if player changed the position, and there is a player yet
				if (dropResult && dropResult.currentPlayer) {
					let updatedTeam = [];

					if (!dropedItem.playerID) {
						updatedTeam = userTeam.players.map((player: any) => {
							// set new position for current player
							if (player.playerID === dropResult.currentPlayer.playerID) {
								return {
									...player,
									fitness: dropedItem.fitness,
									injured: dropedItem.injured,
									name: dropedItem.name,
									number: dropedItem.number,
									rating: dropedItem.rating,
									skill: dropedItem.skill
								};
							}

							return player;
						});

						const getUserTeam = userFor === EUserFor.HOSTS ? hosts : guests;
						const updatedInitialPlayers = getUserTeam.players.map(player => {
							if (dropedItem._id === player._id) {
								return {
									...player,
									isChanged: true,
									fitness: dropResult.currentPlayer.fitness,
									name: dropResult.currentPlayer.name,
									number: dropResult.currentPlayer.number,
									rating: dropResult.currentPlayer.rating,
									skill: dropResult.currentPlayer.skill
								};
							}

							return player;
						});
						const updatedInitialTeam = {
							...getUserTeam,
							players: updatedInitialPlayers
						};

						if (userFor === EUserFor.HOSTS) {
							dispatch(setHosts(updatedInitialTeam));
						} else {
							dispatch(setGuests(updatedInitialTeam));
						}
					} else {
						updatedTeam = userTeam.players.map((player: any) => {
							// set new position for current player
							if (player.playerID === dropedItem.playerID) {
								return {
									...player,
									originPOS: dropResult.currentPlayer.originPOS,
									position: dropResult.currentPlayer.position
								};
							} else if (
								player.playerID === dropResult.currentPlayer.playerID
							) {
								return {
									...player,
									originPOS: dropedItem.originPOS,
									position: dropedItem.position
								};
							}

							return player;
						});
					}

					if (userFor === EUserFor.HOSTS) {
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
		[currentPlayer, hosts, guests, matchDetails]
	);

	/**
	 * if you have another background like additional
	 * see it:
	 * 1. https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_ts/02-drag-around/custom-drag-layer?from-embed=&file=/src/CustomDragLayer.tsx:1522-1572
	 * 2. https://react-dnd.github.io/react-dnd/docs/api/use-drag-layer
	 */

	const isPossibleDrag = !currentPlayer.isChanged ? drag : undefined;

	return (
		<div
			ref={isPossibleDrag}
			className={cn(styles.playerInTable, className, {
				[styles.disabled]: currentPlayer.isChanged
			})}
			{...props}
		>
			<div>{number}</div>
			<div>{name}</div>
			<div>{fitness}%</div>
		</div>
	);
}
