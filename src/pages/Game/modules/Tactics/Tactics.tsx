import cn from 'classnames';
import { useEffect, useState } from 'react';
import { pitchSize } from '@/constants';
import styles from './Tactics.module.scss';
import { Position, PositionMainTable, TableTitlesMemo } from './components';
import { EMatchSide } from '@/constants/match-sides.enum';
import { useAppSelector } from '@/hooks/redux';
import { initPositions, orderedPositions } from './constants/init-positions';
import { EPlayerPositionName } from '@/constants/player-position-name.enum';
import { PositionBenchTable } from './components/PositionBenchTable/PositionBenchTable';
import { withReactDnd } from '@/providers/ReactDnd/ReactDnd.hoc';

const step = 30;

function Tactics(): JSX.Element {
	const { matchDetails, userFor } = useAppSelector(s => s.singleMatchReducer);
	const [positions, setPositions] = useState(initPositions);

	const team =
		userFor === EMatchSide.HOSTS
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

				// if user is playing for Hosts
				if (userFor === EMatchSide.HOSTS) {
					const halfPitchHeight = pitchSize.pitchHeight / 2;

					for (const [key, value] of Object.entries(initPositions)) {
						const yHosts = value.coordinates[1];
						const parseYPosition = halfPitchHeight - yHosts;
						const yHostsPosition = halfPitchHeight + parseYPosition;

						if (
							value.coordinates[0] - step <= x &&
							value.coordinates[0] + step >= x &&
							yHostsPosition - step <= y &&
							yHostsPosition + step >= y
						) {
							playersPosition[key].currentPlayer = p;
						}
					}
				} else {
					// if user is playing for Guests
					for (const [key, value] of Object.entries(initPositions)) {
						if (
							value.coordinates[0] - step <= x &&
							value.coordinates[0] + step >= x &&
							value.coordinates[1] - step <= y &&
							value.coordinates[1] + step >= y
						) {
							playersPosition[key].currentPlayer = p;
						}
					}
				}
			});

			setPositions(playersPosition);
		}
	}, [userFor, matchDetails]);

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
		<div className={styles.tactics}>
			<div className={styles.content}>
				<div
					className={styles.field}
					style={{
						width: pitchSize.pitchWidth / 1.47,
						height: pitchSize.pitchHeight / 1.47
					}}
				>
					{/* attackers */}
					<Position
						className={cn(styles.st, styles.lcf)}
						position={positions[EPlayerPositionName.LCF]}
					/>
					<Position
						className={cn(styles.st)}
						position={positions[EPlayerPositionName.ST]}
					/>
					<Position
						className={cn(styles.st, styles.rcf)}
						position={positions[EPlayerPositionName.RCF]}
					/>

					{/* attackers midfielders */}
					<Position
						className={cn(styles.am, styles.lwm)}
						position={positions[EPlayerPositionName.LWM]}
					/>
					<Position
						className={cn(styles.am, styles.aml)}
						position={positions[EPlayerPositionName.AML]}
					/>
					<Position
						className={cn(styles.am)}
						position={positions[EPlayerPositionName.AMC]}
					/>
					<Position
						className={cn(styles.am, styles.amr)}
						position={positions[EPlayerPositionName.AMR]}
					/>
					<Position
						className={cn(styles.am, styles.rwm)}
						position={positions[EPlayerPositionName.RWM]}
					/>

					{/* midfielders */}
					<Position
						className={cn(styles.cm, styles.lm)}
						position={positions[EPlayerPositionName.LM]}
					/>
					<Position
						className={cn(styles.cm, styles.lcm)}
						position={positions[EPlayerPositionName.LCM]}
					/>
					<Position
						className={cn(styles.cm)}
						position={positions[EPlayerPositionName.CM]}
					/>
					<Position
						className={cn(styles.cm, styles.rcm)}
						position={positions[EPlayerPositionName.RCM]}
					/>
					<Position
						className={cn(styles.cm, styles.rm)}
						position={positions[EPlayerPositionName.RM]}
					/>

					{/* between midfielders & deffenders */}
					<Position
						className={cn(styles.dm, styles.lwb)}
						position={positions[EPlayerPositionName.LWB]}
					/>
					<Position
						className={cn(styles.dm, styles.ldm)}
						position={positions[EPlayerPositionName.LDM]}
					/>
					<Position
						className={cn(styles.dm)}
						position={positions[EPlayerPositionName.CDM]}
					/>
					<Position
						className={cn(styles.dm, styles.rdm)}
						position={positions[EPlayerPositionName.RDM]}
					/>
					<Position
						className={cn(styles.dm, styles.rwb)}
						position={positions[EPlayerPositionName.RWB]}
					/>

					{/* defenders */}
					<Position
						className={cn(styles.cb, styles.lb)}
						position={positions[EPlayerPositionName.LB]}
					/>
					<Position
						className={cn(styles.cb, styles.lcb)}
						position={positions[EPlayerPositionName.LCB]}
					/>
					<Position
						className={cn(styles.cb)}
						position={positions[EPlayerPositionName.CB]}
					/>
					<Position
						className={cn(styles.cb, styles.rcb)}
						position={positions[EPlayerPositionName.RCB]}
					/>
					<Position
						className={cn(styles.cb, styles.rb)}
						position={positions[EPlayerPositionName.RB]}
					/>

					{/* goalkeeper */}
					<Position
						className={cn(styles.gk, {
							[styles.gkAdvanced]: false,
							[styles.gkDrawn]: false
						})}
						position={positions[EPlayerPositionName.GK]}
					/>
				</div>
			</div>

			<div className={styles.players}>
				<div className={styles.playersTable}>
					<div className={styles.titleMainSquadWrapper}>
						<div className={styles.title}>Main Squad</div>
						<div className={styles.title}>
							Replacements: {team.replacements.length}/3
						</div>
					</div>
					<TableTitlesMemo />
					{mainPlayers}
				</div>

				<div className={styles.playersTable}>
					<div className={styles.title}>Bench Squad</div>
					{benchPlayers}
				</div>
			</div>
		</div>
	);
}

export default withReactDnd(Tactics);
