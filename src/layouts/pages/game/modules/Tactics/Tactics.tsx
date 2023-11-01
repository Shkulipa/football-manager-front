import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import {
	initPositionsHOSTS,
	initPositionsGUESTS,
	orderedPositions
} from '../../../../../components/items-tactic-table/constants/init-positions';
import { withReactDnd } from '@/providers/ReactDnd/ReactDnd.hoc';
import { EMatchSide } from '@/constants/footballsimulationengine/match-sides.enum';
import {
	FootballTacticField,
	PlayersTable,
	ReplacementTitle
} from '@/components';
import { FieldLayout } from '@/layouts/common/tactic/FieldLayout';
import { TacticLayout } from '@/layouts/common/tactic/TacticLayout';
import { PlayersLayout } from '@/layouts/common/tactic/PlayersLayout';
import { PositionMainTable } from '@/components/items-tactic-table';
import { PositionBenchTable } from '@/components/items-tactic-table/items/PositionBenchTable/PositionBenchTable';
import { TableTitlesMemo } from '@/components/TableTitles/TableTitles';
import { EFootballFieldsType } from '@/components/FootballTacticField/FootballTacticField.types';

const step = 30;

function Tactics(): JSX.Element {
	const { matchDetails, userFor } = useAppSelector(s => s.singleMatchReducer);
	const isUserHosts = userFor === EMatchSide.HOSTS;
	const initPositions = isUserHosts ? initPositionsHOSTS : initPositionsGUESTS;

	const [positions, setPositions] = useState(initPositions);

	const team = isUserHosts
		? matchDetails!.secondTeam
		: matchDetails!.kickOffTeam;

	/**
	 * @info
	 * init players from Match Details,
	 * where get info for which team user is playing right now
	 */
	useEffect(() => {
		if (matchDetails) {
			const playersPosition = JSON.parse(JSON.stringify(initPositions));

			team.players.forEach(p => {
				const x = p.originPOS[0];
				const y = p.originPOS[1];

				// detect which position player in field by coordinates
				for (const [key, value] of Object.entries(initPositions)) {
					const isXLine =
						value.coordinates[0] - step <= x &&
						value.coordinates[0] + step >= x;
					const isYLine =
						value.coordinates[1] - step <= y &&
						value.coordinates[1] + step >= y;
					if (isXLine && isYLine) {
						playersPosition[key].currentPlayer = p;
					}
				}
			});

			setPositions(playersPosition);
		}
	}, [userFor, matchDetails, team.players]);

	const positionsInArr = Object.values(positions);
	const positionTaken = positionsInArr
		.filter(val => val.currentPlayer)
		.sort(function (a: any, b: any) {
			return (
				orderedPositions.indexOf(a.currentPlayer.position) -
				orderedPositions.indexOf(b.currentPlayer.position)
			);
		});
	const mainPlayers = positionTaken.map((position, index) => (
		<PositionMainTable key={index} position={position} />
	));

	const benchPlayers = team.bench.map(p => (
		<PositionBenchTable key={p._id} currentPlayer={p} />
	));

	return (
		<TacticLayout>
			<FieldLayout>
				<FootballTacticField
					positions={positions}
					typeField={EFootballFieldsType.MATCH}
				/>
				<ReplacementTitle
					title={`Replacements: ${team.replacements.length}/3`}
				/>
			</FieldLayout>

			<PlayersLayout>
				<PlayersTable title="Main Squad">
					<TableTitlesMemo />
					{mainPlayers}
				</PlayersTable>

				<PlayersTable title="Bench Squad">{benchPlayers}</PlayersTable>
			</PlayersLayout>
		</TacticLayout>
	);
}

export default withReactDnd(Tactics);
