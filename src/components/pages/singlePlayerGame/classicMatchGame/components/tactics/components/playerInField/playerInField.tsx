import cn from 'classnames';
import { useDrag } from 'react-dnd';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { EUserFor, matchSlice } from 'src/store/slices';

import { IPlayerInFieldProps } from './playerInField.interfaces';
import styles from './playerInField.module.scss';

export function PlayerInField({ currentPlayer }: IPlayerInFieldProps) {
	const dispatch = useAppDispatch();
	const { setMatchDetails } = matchSlice.actions;

	const { matchDetails, userFor, pitchSize } = useAppSelector(s => s.match);
	const userTeam =
		userFor === EUserFor.HOSTS
			? matchDetails.secondTeam
			: matchDetails.kickOffTeam;

	const [{ isDragging }, drag, dragPreview] = useDrag(
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
					const updatedTeam = userTeam.players.map((player: any) => {
						// set new position for current player
						if (player.playerID === dropedItem.playerID) {
							return {
								...player,
								originPOS: dropResult.currentPlayer.originPOS,
								position: dropResult.currentPlayer.position
							};
						} else if (player.playerID === dropResult.currentPlayer.playerID) {
							return {
								...player,
								originPOS: dropedItem.originPOS,
								position: dropedItem.position
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
