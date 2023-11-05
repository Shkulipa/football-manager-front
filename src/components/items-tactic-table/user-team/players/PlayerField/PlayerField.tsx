import { useDrag } from 'react-dnd';

import { PlayerDragField } from '@/components';
import { IPlayerFieldProps } from './PlayerField.types';
import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';
import { IDropResult, IDropResultData } from '../../types/position-user-team';
import { IGetOwnTeamRes } from '@/api/rest/user-team/types/get-own-team-res';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSecondVersionTeam } from '@/layouts/pages/user-team/store/userTeam.slice';
import { movePlayer } from '../../utils/move-player';
import { swapPlayers } from '../../utils/swap-players';
import { groupPlayersByPositionInMainSquad } from '@/utils/group-players-by-position-in-main-squad';

/**
 * @info
 * Player data in field of football field in User team page
 */
export function PlayerField({ player }: IPlayerFieldProps) {
	const dispatch = useAppDispatch();
	const { secondVersionTeam } = useAppSelector(s => s.userTeamReducer);

	const [{ isDragging }, drag, dragPreview] = useDrag(
		() => ({
			type: ETypeDragTactics.FOOTBALL_FIELD,
			item: player,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				const dropResultType = monitor.getItemType();
				if (!dropResult || !secondVersionTeam) return;

				/**
				 * @info
				 * drop players from "Football Field" squad into another "Football field"
				 */
				const isFromFootballFieldIntoMainTable =
					dropResult.type === ETypeDragTactics.TABLE_MAIN &&
					dropResultType === ETypeDragTactics.FOOTBALL_FIELD;
				const isFromFootballFieldIntoFootballField =
					dropResult.type === ETypeDragTactics.FOOTBALL_FIELD &&
					dropResultType === ETypeDragTactics.FOOTBALL_FIELD;
				if (
					isFromFootballFieldIntoFootballField ||
					isFromFootballFieldIntoMainTable
				) {
					if (!secondVersionTeam.main) return;
					const dropResultData = dropResult.data as IDropResultData;

					/**
					 * @info
					 *  if "Football field" is taken by another player
					 */
					if (dropResultData.player) {
						const dropResultData = dropResult.data as IDropResultData;

						const updatedMain = swapPlayers(
							secondVersionTeam.main,
							dropResultData,
							droppedItem
						);

						/**
						 * @info
						 * calculate avr rating of current 11 main players
						 */
						const skills = groupPlayersByPositionInMainSquad(updatedMain);

						const updatedTeam: IGetOwnTeamRes = {
							...secondVersionTeam,
							main: updatedMain,
							skills
						};

						dispatch(setSecondVersionTeam(updatedTeam));
						return;
					}

					/**
					 * @info
					 * if "Football field" is free
					 */
					if (!dropResultData.player) {
						const dropResultData = dropResult.data as IDropResultData;

						const updatedMain = movePlayer(
							secondVersionTeam.main,
							dropResultData,
							droppedItem
						);

						/**
						 * @info
						 * calculate avr rating of current 11 main players
						 */
						const skills = groupPlayersByPositionInMainSquad(updatedMain);

						const updatedTeam: IGetOwnTeamRes = {
							...secondVersionTeam,
							main: updatedMain,
							skills
						};

						dispatch(setSecondVersionTeam(updatedTeam));
						return;
					}
				}

				/**
				 * @info
				 * drop players from "Football Field" squad into "Reserve"
				 */
				if (
					dropResult.type === ETypeDragTactics.TABLE_RESERVE &&
					dropResultType === ETypeDragTactics.FOOTBALL_FIELD
				) {
					if (!secondVersionTeam.main) return;

					/**
					 * @info
					 * update main squad
					 */
					const updatedMainArr = Object.entries(secondVersionTeam.main).filter(
						p => p[1]._id !== droppedItem._id
					);
					const updatedMain = Object.fromEntries(updatedMainArr);

					/**
					 * @info
					 * calculate avr rating of current 11 main players
					 */
					const skills = groupPlayersByPositionInMainSquad(updatedMain);

					/**
					 * @info
					 * remove player from reserve
					 */
					const updatedReserve = [...secondVersionTeam.reserve, droppedItem];

					const updatedTeam: IGetOwnTeamRes = {
						...secondVersionTeam,
						main: updatedMain,
						reserve: updatedReserve,
						skills
					};

					dispatch(setSecondVersionTeam(updatedTeam));
					return;
				}

				/**
				 * @info
				 * drop players from Football Field squad into Bench
				 */
				if (
					dropResult.type === ETypeDragTactics.TABLE_BENCH &&
					dropResultType === ETypeDragTactics.FOOTBALL_FIELD
				) {
					if (!secondVersionTeam.main) return;

					/**
					 * @info
					 * update main squad
					 */
					const updatedMainArr = Object.entries(secondVersionTeam.main).filter(
						p => p[1]._id !== droppedItem._id
					);
					const updatedMain = Object.fromEntries(updatedMainArr);

					/**
					 * @info
					 * calculate avr rating of current 11 main players
					 */
					const skills = groupPlayersByPositionInMainSquad(updatedMain);

					/**
					 * @info
					 * remove player from reserve
					 */
					const updatedBench = [...secondVersionTeam.bench, droppedItem];

					const updatedTeam: IGetOwnTeamRes = {
						...secondVersionTeam,
						main: updatedMain,
						bench: updatedBench,
						skills
					};

					dispatch(setSecondVersionTeam(updatedTeam));
					return;
				}
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[secondVersionTeam, player]
	);

	if (isDragging)
		return (
			<PlayerDragField ref={dragPreview} isDragging={isDragging}>
				{player.number}
			</PlayerDragField>
		);

	return <PlayerDragField ref={drag}>{player.number}</PlayerDragField>;
}
