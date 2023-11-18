import { useDrag } from 'react-dnd';
import { ETypeDragTactics } from '../../../constants/type-drag-drop';
import { IPlayerReserveTableProps } from './PlayerReserveTable.types';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { TSquadMain } from '@/types/football-simulator/user-team';
import { setSecondVersionTeam } from '@/modules/pages/user-team/store/userTeam.slice';
import { IGetOwnTeamRes } from '@/api/rest/user-team/types/get-own-team-res';
import { IDropResultData, IDropResult } from '../../types/position-user-team';
import { groupPlayersByPositionInMainSquad } from '@/utils/group-players-by-position-in-main-squad';
import { PlayerTableUserTeam } from '../../components/PlayerTableUserTeam';

export const PlayerReserveTable = ({
	player
}: IPlayerReserveTableProps): JSX.Element => {
	const { name, number } = player;
	const dispatch = useAppDispatch();
	const { secondVersionTeam } = useAppSelector(s => s.userTeamReducer);

	const [, drag] = useDrag(
		() => ({
			type: ETypeDragTactics.TABLE_RESERVE,
			item: player,
			end: (droppedItem, monitor) => {
				const dropResult = monitor.getDropResult<IDropResult>();
				const dropResultType = monitor.getItemType();

				if (!dropResult || !secondVersionTeam) return;

				/**
				 * @info
				 * drop players from "reserve" squad into "bench squad"
				 */
				if (
					dropResult.type === ETypeDragTactics.TABLE_BENCH &&
					dropResultType === ETypeDragTactics.TABLE_RESERVE
				) {
					/**
					 * @info
					 * update bench squad
					 */
					const updatedBench = [...secondVersionTeam.bench, droppedItem];

					/**
					 * @info
					 * remove player from reserve
					 */
					const updatedReserve = secondVersionTeam.reserve.filter(
						p => p._id !== droppedItem._id
					);

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
				 * drop players from "reserve" squad into "football field"
				 */
				if (
					dropResult.type === ETypeDragTactics.FOOTBALL_FIELD &&
					dropResultType === ETypeDragTactics.TABLE_RESERVE
				) {
					const dropResultData = dropResult.data as IDropResultData;
					/**
					 * @info
					 * if free position
					 */
					if (!dropResultData.player) {
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
						 * remove player from reserve
						 */
						const updatedReserve = secondVersionTeam.reserve.filter(
							p => p._id !== droppedItem._id
						);

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
					 * position is taken by another player
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
						 * remove player from reserve
						 */
						const updatedReserve = [
							...secondVersionTeam.reserve,
							dropResultData.player
						].filter(p => p._id !== droppedItem._id);

						const updatedTeam: IGetOwnTeamRes = {
							...secondVersionTeam,
							main: updatedMain,
							reserve: updatedReserve,
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
		<PlayerTableUserTeam ref={drag}>
			<div>{number}</div>
			<div>{name}</div>
		</PlayerTableUserTeam>
	);
};
