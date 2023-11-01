import { FootballTacticField, PlayersTable } from '@/components';
import { useAppSelector } from '@/hooks/redux';
import {
	initPositionsHOSTS,
	orderedPositions
} from '../../../../components/items-tactic-table/constants/init-positions';
import { useEffect, useState } from 'react';
import { withReactDnd } from '@/providers/ReactDnd/ReactDnd.hoc';
import { FieldLayout } from '@/layouts/common/tactic/FieldLayout';
import { PlayersLayout } from '@/layouts/common/tactic/PlayersLayout';
import { TacticLayout } from '@/layouts/common/tactic/TacticLayout';
import { TableTitlesMemo } from '@/components/TableTitles/TableTitles';
import { PositionReserveRegionTable } from '@/components/items-tactic-table/items/PositionReserveRegionTable';
import { EFootballFieldsType } from '@/components/FootballTacticField/FootballTacticField.types';
import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import { playerPositionsFirstTeam } from '@/constants/footballsimulationengine/player-positions';
import { PositionMainTableUserTeam } from '@/components/items-tactic-table/items/PositionMainTableUserTeam/PositionMainTableUserTeam';

const OwnUserTeamComponent = (): JSX.Element => {
	const { secondVersionTeam } = useAppSelector(s => s.userTeamReducer);
	const [positions, setPositions] = useState(initPositionsHOSTS);

	/**
	 * @info
	 * update squad after drag & drop players
	 */
	useEffect(() => {
		if (secondVersionTeam?.main) {
			const playerPositionData = Object.entries(secondVersionTeam?.main);
			const parsePlayersPosition = playerPositionData.map(
				([position, playerData]) => {
					const parsedPositionPlayer = {
						coordinates:
							playerPositionsFirstTeam[position as EPlayerPositionName],
						currentPlayer: playerData,
						position: EPlayerPositionName[position as EPlayerPositionName]
					};
					return [position, parsedPositionPlayer];
				}
			);
			const newPlayersParsedPositions =
				Object.fromEntries(parsePlayersPosition);
			const updatedPositions = {
				...positions,
				...newPlayersParsedPositions
			};

			setPositions(updatedPositions);
		}
	}, [secondVersionTeam]);

	const positionsInArr = Object.values(positions);
	const positionTaken = positionsInArr
		.filter(val => val.currentPlayer)
		.sort(function (a: any, b: any) {
			return (
				orderedPositions.indexOf(a?.currentPlayer?.position) -
				orderedPositions.indexOf(b?.currentPlayer?.position)
			);
		});
	const mainPlayers = positionTaken.map((position, index) => (
		<PositionMainTableUserTeam key={index} position={position} />
	));

	return (
		<TacticLayout>
			<FieldLayout>
				<FootballTacticField
					positions={positions}
					typeField={EFootballFieldsType.PREPARE}
				/>
			</FieldLayout>

			<PlayersLayout>
				<PlayersTable title="Main Squad">
					<TableTitlesMemo />
					{mainPlayers}
				</PlayersTable>
				{/* <PlayersTable title="Bench Squad">
					<PositionRegionTable />
				</PlayersTable> */}
				<PlayersTable title="Reserve Squad">
					<PositionReserveRegionTable
						players={secondVersionTeam?.reserve || []}
					/>
				</PlayersTable>
			</PlayersLayout>
		</TacticLayout>
	);
};

export const OwnUserTeam = withReactDnd(OwnUserTeamComponent);
