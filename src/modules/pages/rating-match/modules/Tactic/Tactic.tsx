import { TacticLayout } from '@/layouts/tactic/TacticLayout';
import {
	initPositionsGUESTS,
	initPositionsHOSTS,
	orderedPositions
} from '@/components/items-tactic-table/constants/init-positions';
import { useEffect, useMemo, useState } from 'react';
import { FieldLayout } from '@/layouts/tactic/FieldLayout';
import ReactDndProvider from '@/providers/ReactDnd/ReactDnd.provider';
import {
	Button,
	FootballTacticFieldRatingMatch,
	PlayersTable,
	ReplacementTitle
} from '@/components';
import { PlayersLayout } from '@/layouts/tactic/PlayersLayout';
import { TableTitlesMemo } from '@/components/TableTitles/TableTitles';
import { TPositionTacticPositionsRatingMatch } from '@/components/football-tactic-fields/FootballTacticFieldRatingMatch/FootballTacticFieldRatingMatch.types';
import { IPosition } from '@/components/items-tactic-table/rating-match/types/position.types';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import styles from './Tactic.module.scss';
import { isEqualSquad } from './utils/is-equal-squad';
import { ratingMatchSlice } from '../../store/rating-match';
import { PositionMainTable } from '@/components/items-tactic-table/rating-match/positions/PositionMainTable/PositionMainTable';
import { PositionBenchTable } from '@/components/items-tactic-table/rating-match/positions/PositionBenchTable/PositionBenchTable';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { useTimer } from 'react-timer-hook';
import { apiRatingMatch } from '@/api/rest/rating-match/rating-match';
import { useParams } from 'next/navigation';
import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';

export const Tactic = (): JSX.Element => {
	const params = useParams();
	const dispatch = useAppDispatch();
	const {
		secondUserTeamVersion,
		initUserTeam,
		matchDetails,
		cooldownUpdateSquad
	} = useAppSelector(s => s.ratingMatchReducer);
	const { reset, setSecondUserTeamVersion, setCooldownUpdateSquad } =
		ratingMatchSlice.actions;

	const { restart, seconds } = useTimer({
		expiryTimestamp: new Date(cooldownUpdateSquad || 0),
		onExpire: () => {
			dispatch(setCooldownUpdateSquad(null));
		}
	});

	const isUserHosts =
		secondUserTeamVersion?.manager === matchDetails?.secondTeam ? true : false;
	const initPositions = isUserHosts ? initPositionsHOSTS : initPositionsGUESTS;
	const [positions, setPositions] =
		useState<TPositionTacticPositionsRatingMatch>(
			initPositions as TPositionTacticPositionsRatingMatch
		);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!secondUserTeamVersion)
			dispatch(setSecondUserTeamVersion(initUserTeam));

		return () => {
			dispatch(setSecondUserTeamVersion(null));
		};
	}, []);

	useEffect(() => {
		if (secondUserTeamVersion) {
			const updatedPositionsArr = Object.entries(positions).map(p => {
				const namePosition = p[0];
				const position = p[1];
				const value: IPosition = {
					...position,
					player: null
				};

				// check if player for this position
				const isTakenPosition = secondUserTeamVersion.players.find(
					pl => pl.position === namePosition
				);
				if (isTakenPosition) value.player = isTakenPosition;

				return [namePosition, value];
			});
			const updatedPositions = Object.fromEntries(updatedPositionsArr);

			setPositions(updatedPositions);
		}
	}, [secondUserTeamVersion]);

	/**
	 * @info
	 * checking updating, for disabling button "update"
	 */
	const isEqualSquads = useMemo(() => {
		if (initUserTeam && secondUserTeamVersion)
			return isEqualSquad(initUserTeam, secondUserTeamVersion);

		return false;
	}, []);

	const onReset = () => dispatch(reset());

	if (!secondUserTeamVersion) return <></>;

	if (cooldownUpdateSquad)
		return <div>Updating squad will available in: {seconds} seconds</div>;

	/**
	 * @info
	 * view table with players from "Main squad"
	 */
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
	const benchPlayers = secondUserTeamVersion.bench.map(p => (
		<PositionBenchTable key={p._id} player={p} />
	));

	const onUpdateHandler = async () => {
		const { players, bench } = secondUserTeamVersion;

		try {
			setIsLoading(true);
			const main = Object.fromEntries(
				players.map(p => [p.position, p._id])
			) as Record<Partial<EPlayerPositionName>, string>;

			await apiRatingMatch.squadUpdate(params.id as string, { main, bench });

			const currentTime = new Date().getTime();
			const expireIn = currentTime + 15000; // 15 secs
			dispatch(setCooldownUpdateSquad(expireIn));
			restart(new Date(expireIn));
			setSecondUserTeamVersion(null);
		} catch (e) {
			handleActionErrors({ e, dispatch });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ReactDndProvider>
			<TacticLayout>
				<FieldLayout>
					<FootballTacticFieldRatingMatch positions={positions} />
					<ReplacementTitle
						title={`Replacements: ${secondUserTeamVersion.replacements.length}/3`}
					/>
					<div className={styles.actions}>
						<Button
							type="button"
							onClick={onReset}
							disabled={isEqualSquads || isLoading}
						>
							Reset Changes
						</Button>
						<Button
							type="submit"
							onClick={onUpdateHandler}
							disabled={isEqualSquads || isLoading}
						>
							Update Team
						</Button>
					</div>
				</FieldLayout>

				<PlayersLayout>
					<PlayersTable title="Main Squad">
						<TableTitlesMemo />
						{mainPlayers}
					</PlayersTable>
					<PlayersTable title="Bench Squad">{benchPlayers}</PlayersTable>
				</PlayersLayout>
			</TacticLayout>
		</ReactDndProvider>
	);
};
