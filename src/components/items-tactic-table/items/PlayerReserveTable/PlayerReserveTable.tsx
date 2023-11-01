import { useDrag } from 'react-dnd';
import { ETypeDragTactics } from '../../constants/type-drag-drop';
import { IPlayerReserveTableProps } from './PlayerReserveTable.types';
import { PlayerTable } from '@/components/PlayerTable';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { TSquadMain } from '@/types/primary/user-team';
import { setSecondVersionTeam } from '@/layouts/pages/user-team/store/userTeam.slice';
import { IGetOwnTeamRes } from '@/api/rest/user-team/types/get-own-team-res';
import {
	IDropResultUserTeam,
	IDropResultUserTeamData
} from '../../types/position-user-tema';

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
				const dropResult = monitor.getDropResult<IDropResultUserTeam>();
				const dropResultType = monitor.getItemType();

				if (!dropResult || !secondVersionTeam) return;

				if (
					dropResult.type === ETypeDragTactics.FOOTBALL_FIELD &&
					dropResultType === ETypeDragTactics.TABLE_RESERVE
				) {
					/**
					 * @info
					 * update main squad
					 */
					const dropResultData = dropResult.data as IDropResultUserTeamData;
					const mainSquad: TSquadMain = {
						...secondVersionTeam.main
					};

					mainSquad[dropResultData.position] = droppedItem;

					/**
					 * @info
					 * remove player from reserve
					 */
					const updatedReserve = secondVersionTeam.reserve.filter(
						p => p._id !== droppedItem._id
					);

					const updatedTeam: IGetOwnTeamRes = {
						...secondVersionTeam,
						main: mainSquad,
						reserve: updatedReserve
					};

					dispatch(setSecondVersionTeam(updatedTeam));
				}
			},
			collect: monitor => ({
				isDragging: monitor.isDragging()
			})
		}),
		[player]
	);

	return (
		<PlayerTable ref={drag}>
			<div>{number}</div>
			<div>{name}</div>
		</PlayerTable>
	);
};
