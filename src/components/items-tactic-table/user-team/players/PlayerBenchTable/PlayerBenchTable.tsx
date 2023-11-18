import { useDrag } from 'react-dnd';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IPlayerBenchTableProps } from './PlayerBenchTable.interfaces';
import { ETypeDragTactics } from '@/components/items-tactic-table/constants/type-drag-drop';
import { IDropResult, IDropResultData } from '../../types/position-user-team';
import { IGetOwnTeamRes } from '@/api/rest/user-team/types/get-own-team-res';
import { setSecondVersionTeam } from '@/modules/pages/user-team/store/userTeam.slice';
import { PlayerTableUserTeam } from '../../components/PlayerTableUserTeam';
import { TSquadMain } from '@/types/football-simulator/user-team';
import { groupPlayersByPositionInMainSquad } from '@/utils/group-players-by-position-in-main-squad';

export function PlayerBenchTable({
	player,
	className
}: IPlayerBenchTableProps) {
	const { name, number } = player;

	const dispatch = useAppDispatch();
	const { secondVersionTeam } = useAppSelector(s => s.userTeamReducer);

	const [, drag] = useDrag(
		() => ({
			type: ETypeDragTactics.TABLE_BENCH,
			item: player,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				const dropResultType = monitor.getItemType();
				if (!dropResult || !secondVersionTeam) return;

				/**
				 * @info
				 * drop players from "Bench" squad into "reserve squad"
				 */
				if (
					dropResult.type === ETypeDragTactics.TABLE_RESERVE &&
					dropResultType === ETypeDragTactics.TABLE_BENCH
				) {
					/**
					 * @info
					 * update bench squad
					 */
					const updatedBench = secondVersionTeam.bench.filter(
						p => p._id !== droppedItem._id
					);

					/**
					 * @info
					 * remove player from "reserve"
					 */
					const updatedReserve = [...secondVersionTeam.reserve, droppedItem];

					const updatedTeam: IGetOwnTeamRes = {
						...secondVersionTeam,
						bench: updatedBench,
						reserve: updatedReserve
					};

					dispatch(setSecondVersionTeam(updatedTeam));
					return;
				}

				/**
				 * @info
				 * drop players from Bench squad into "football field" or "Table with Main Squad"
				 */
				const formBenchIntoFootballField =
					dropResult.type === ETypeDragTactics.FOOTBALL_FIELD &&
					dropResultType === ETypeDragTactics.TABLE_BENCH;
				const formBenchIntoMainTable =
					dropResult.type === ETypeDragTactics.TABLE_MAIN &&
					dropResultType === ETypeDragTactics.TABLE_BENCH;
				if (formBenchIntoFootballField || formBenchIntoMainTable) {
					const dropResultData = dropResult.data as IDropResultData;

					/**
					 * @info
					 * if position is free
					 */
					if (!dropResultData.player) {
						const updatedMain: TSquadMain = {
							...secondVersionTeam.main
						};

						updatedMain[dropResultData.position] = droppedItem;

						/**
						 * @info
						 * calculate avr rating of current 11 main players
						 */
						const skills = groupPlayersByPositionInMainSquad(updatedMain);

						/**
						 * @info
						 * remove player from reserve
						 */
						const updatedBench = secondVersionTeam.bench.filter(
							p => p._id !== droppedItem._id
						);

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
					 * if position is taken
					 */
					if (dropResultData.player) {
						const dropResultData = dropResult.data as IDropResultData;
						const updatedMain: TSquadMain = {
							...secondVersionTeam.main
						};

						updatedMain[dropResultData.position] = droppedItem;

						/**
						 * @info
						 * calculate avr rating of current 11 main players
						 */
						const skills = groupPlayersByPositionInMainSquad(updatedMain);

						/**
						 * @info
						 * remove player from bench
						 */
						const updatedBench = [
							...secondVersionTeam.bench,
							dropResultData.player
						].filter(p => p._id !== droppedItem._id);

						const updatedTeam: IGetOwnTeamRes = {
							...secondVersionTeam,
							main: updatedMain,
							bench: updatedBench,
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
			<div>{number}</div>
			<div>{name}</div>
		</PlayerTableUserTeam>
	);
}
