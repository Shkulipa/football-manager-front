import { useDrag } from 'react-dnd';

import { IPlayerMainTableUserTeamProps } from './PlayerMainTable.interfaces';
import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';
import { IDropResult, IDropResultData } from '../../types/position-user-team';
import { PlayerTableUserTeam } from '../../components/PlayerTableUserTeam';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IGetOwnTeamRes } from '@/api/rest/user-team/types/get-own-team-res';
import { setSecondVersionTeam } from '@/layouts/pages/user-team/store/userTeam.slice';
import { movePlayer } from '../../utils/move-player';
import { swapPlayers } from '../../utils/swap-players';
import { groupPlayersByPositionInMainSquad } from '@/utils/group-players-by-position-in-main-squad';

export function PlayerMainTable({
	player,
	className
}: IPlayerMainTableUserTeamProps) {
	const dispatch = useAppDispatch();
	const { secondVersionTeam } = useAppSelector(s => s.userTeamReducer);

	const [, drag] = useDrag(
		() => ({
			type: ETypeDragTactics.TABLE_MAIN,
			item: player,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				const dropResultType = monitor.getItemType();
				if (!dropResult || !secondVersionTeam) return;

				/**
				 * @info
				 * drop players from Main squad into Bench
				 */
				if (
					dropResult.type === ETypeDragTactics.TABLE_BENCH &&
					dropResultType === ETypeDragTactics.TABLE_MAIN
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
					 * remove player from "Bench"
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

				/**
				 * @info
				 * drop players from "Main" squad into "Bench"
				 */
				if (
					dropResult.type === ETypeDragTactics.TABLE_RESERVE &&
					dropResultType === ETypeDragTactics.TABLE_MAIN
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
				 * drop players from "Main" squad into "Football Field"
				 */
				const fromMainTableIntoFootballField =
					dropResult.type === ETypeDragTactics.FOOTBALL_FIELD &&
					dropResultType === ETypeDragTactics.TABLE_MAIN;
				const fromMainTableIntoMainTable =
					dropResult.type === ETypeDragTactics.TABLE_MAIN &&
					dropResultType === ETypeDragTactics.TABLE_MAIN;
				if (fromMainTableIntoFootballField || fromMainTableIntoMainTable) {
					if (!secondVersionTeam.main) return;
					const dropResultData = dropResult.data as IDropResultData;

					/**
					 * @info
					 * if "Football Field" is taken
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
					 * if "Football Field" is free
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
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[secondVersionTeam, player]
	);

	return (
		<PlayerTableUserTeam ref={drag} className={className}>
			<div>{player.number}</div>
			<div>{player.name}</div>
		</PlayerTableUserTeam>
	);
}
