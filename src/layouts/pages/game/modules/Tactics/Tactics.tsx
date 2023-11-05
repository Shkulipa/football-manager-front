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
	FootballTacticFieldSingleMatch,
	PlayersTable,
	ReplacementTitle
} from '@/components';
import { FieldLayout } from '@/layouts/common/tactic/FieldLayout';
import { TacticLayout } from '@/layouts/common/tactic/TacticLayout';
import { PlayersLayout } from '@/layouts/common/tactic/PlayersLayout';
import { PositionBenchTable } from '@/components/items-tactic-table/single-match/positions/PositionBenchTable/PositionBenchTable';
import { TableTitlesMemo } from '@/components/TableTitles/TableTitles';
import { PositionMainTable } from '@/components/items-tactic-table/single-match/positions/PositionMainTable/PositionMainTable';
import { TPositionTacticPositionsSingleMatch } from '@/components/football-tactic-fields/FootballTacticFieldSingleMatch/FootballTacticFieldSingleMatch.types';
import { IPosition } from '@/components/items-tactic-table/single-match/types/position.types';
import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import { step } from '@/components/football-tactic-fields/constants';

function Tactics(): JSX.Element {
	const { matchDetails, userFor } = useAppSelector(s => s.singleMatchReducer);
	const isUserHosts = userFor === EMatchSide.HOSTS;
	const initPositions = isUserHosts ? initPositionsHOSTS : initPositionsGUESTS;

	const [positions, setPositions] =
		useState<TPositionTacticPositionsSingleMatch>(
			initPositions as TPositionTacticPositionsSingleMatch
		);

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
			const playersPosition = JSON.parse(
				JSON.stringify(initPositions)
			) as TPositionTacticPositionsSingleMatch;

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
						playersPosition[key as EPlayerPositionName].player = p;
					}
				}
			});

			setPositions(playersPosition);
		}
	}, [userFor, matchDetails, team.players]);

	const positionsInArr = Object.values(positions);
	const positionTaken = positionsInArr
		.filter(val => val.player)
		.sort(function (a: IPosition, b: IPosition) {
			return (
				orderedPositions.indexOf(a.position) -
				orderedPositions.indexOf(b.position)
			);
		});
	const mainPlayers = positionTaken.map((position, index) => (
		<PositionMainTable key={index} position={position} />
	));

	const benchPlayers = team.bench.map(p => (
		<PositionBenchTable key={p._id} player={p} />
	));

	return (
		<TacticLayout>
			<FieldLayout>
				<FootballTacticFieldSingleMatch positions={positions} />
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
