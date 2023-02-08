import cn from 'classnames';
import { memo, useEffect, useState } from 'react';
import { useAppSelector } from 'src/hooks';
import { EUserFor } from 'src/store/slices';

import {
	PlayerInTable,
	Position,
	PositionInTable,
	TableTitles
} from './components';
import styles from './tactics.module.scss';

const step = 30;

const initPositions = {
	lst: {
		position: 'ST',
		coordinates: [455, 435],
		currentPlayer: null
	},

	st: {
		position: 'ST',
		coordinates: [325, 435],
		currentPlayer: null
	},
	rst: {
		position: 'ST',
		coordinates: [195, 435],
		currentPlayer: null
	},

	/* attackers midfielders */
	lw: {
		position: 'RL',
		coordinates: [585, 350],
		currentPlayer: null
	},

	lam: {
		position: 'CM',
		coordinates: [455, 350],
		currentPlayer: null
	},

	am: {
		position: 'CM',
		coordinates: [325, 350],
		currentPlayer: null
	},

	ram: {
		position: 'CM',
		coordinates: [250, 350],
		currentPlayer: null
	},

	rw: {
		position: 'RM',
		coordinates: [65, 350],
		currentPlayer: null
	},

	/* midfielders */
	lm: {
		position: 'LM',
		coordinates: [585, 265],
		currentPlayer: null
	},

	lcm: {
		position: 'CM',
		coordinates: [455, 265],
		currentPlayer: null
	},

	cm: {
		position: 'CM',
		coordinates: [325, 265],
		currentPlayer: null
	},

	rcm: {
		position: 'CM',
		coordinates: [195, 265],
		currentPlayer: null
	},

	rm: {
		position: 'RM',
		coordinates: [65, 265],
		currentPlayer: null
	},

	/* between midfielders & deffenders */
	lwb: {
		position: 'LB',
		coordinates: [585, 175],
		currentPlayer: null
	},

	ldm: {
		position: 'CB',
		coordinates: [455, 175],
		currentPlayer: null
	},

	dm: {
		position: 'CB',
		coordinates: [325, 175],
		currentPlayer: null
	},

	rdm: {
		position: 'CB',
		coordinates: [195, 175],
		currentPlayer: null
	},

	rwb: {
		position: 'RB',
		coordinates: [65, 175],
		currentPlayer: null
	},

	// defenders
	lb: {
		position: 'LB',
		coordinates: [585, 85],
		currentPlayer: null
	},

	cbl: {
		position: 'CB',
		coordinates: [455, 85],
		currentPlayer: null
	},

	cb: {
		position: 'CB',
		coordinates: [325, 85],
		currentPlayer: null
	},

	cbr: {
		position: 'CB',
		coordinates: [195, 85],
		currentPlayer: null
	},

	rb: {
		position: 'RB',
		coordinates: [65, 85],
		currentPlayer: null
	},

	gk: {
		position: 'GK',
		coordinates: [325, 15],
		currentPlayer: null
	}
};

const TableTitlesMemo = memo(TableTitles);

export function Tactics() {
	const { hosts, guests, pitchSize, userFor, matchDetails } = useAppSelector(
		s => s.match
	);

	const [positions, setPositions] = useState(initPositions);

	const userTeam =
		userFor === EUserFor.HOSTS
			? matchDetails.secondTeam
			: matchDetails.kickOffTeam;

	useEffect(() => {
		const playersPosition: any = JSON.parse(JSON.stringify(initPositions));
		userTeam.players.forEach(p => {
			const x = p.originPOS[0];
			const y = p.originPOS[1];

			if (userFor === EUserFor.HOSTS) {
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
	}, [userTeam.players]);

	const positionsInArr = Object.values(positions);
	const positionTaken = positionsInArr
		.filter(val => val.currentPlayer)
		.sort(function (a, b) {
			const order = ['GK', 'LB', 'CB', 'RB', 'LM', 'CM', 'RM', 'ST'];
			return (
				order.indexOf(a.currentPlayer.position) -
				order.indexOf(b.currentPlayer.position)
			);
		});
	const mainPlayers = positionTaken.map((position, index) => (
		<PositionInTable key={index} position={position} />
	));

	const getUserTeam = userFor === EUserFor.HOSTS ? hosts : guests;
	const benchPlayers = getUserTeam.players
		.filter(p => p.role === 'bench')
		.map(p => <PlayerInTable key={p._id} currentPlayer={p} />);

	return (
		<div className={styles.tactics}>
			<div className={styles.title}>{userTeam.name}</div>

			<div className={styles.content}>
				<div
					className={styles.field}
					style={{
						width: pitchSize.pitchWidth / 1.8,
						height: pitchSize.pitchHeight / 1.8
					}}
				>
					{/* attackers */}
					<Position
						className={cn(styles.st, styles.lst)}
						position={positions.lst}
					/>
					<Position className={cn(styles.st)} position={positions.st} />
					<Position
						className={cn(styles.st, styles.rst)}
						position={positions.rst}
					/>

					{/* attackers midfielders */}
					<Position
						className={cn(styles.am, styles.lw)}
						position={positions.lw}
					/>
					<Position
						className={cn(styles.am, styles.lam)}
						position={positions.lam}
					/>
					<Position className={cn(styles.am)} position={positions.am} />
					<Position
						className={cn(styles.am, styles.ram)}
						position={positions.ram}
					/>
					<Position
						className={cn(styles.am, styles.rw)}
						position={positions.rw}
					/>

					{/* midfielders */}
					<Position
						className={cn(styles.cm, styles.lm)}
						position={positions.lm}
					/>
					<Position
						className={cn(styles.cm, styles.lcm)}
						position={positions.lcm}
					/>
					<Position className={cn(styles.cm)} position={positions.cm} />
					<Position
						className={cn(styles.cm, styles.rcm)}
						position={positions.rcm}
					/>
					<Position
						className={cn(styles.cm, styles.rm)}
						position={positions.rm}
					/>

					{/* between midfielders & deffenders */}
					<Position
						className={cn(styles.dm, styles.lwb)}
						position={positions.lwb}
					/>
					<Position
						className={cn(styles.dm, styles.ldm)}
						position={positions.ldm}
					/>
					<Position className={cn(styles.dm)} position={positions.dm} />
					<Position
						className={cn(styles.dm, styles.rdm)}
						position={positions.rdm}
					/>
					<Position
						className={cn(styles.dm, styles.rwb)}
						position={positions.rwb}
					/>

					{/* defenders */}
					<Position
						className={cn(styles.cb, styles.lb)}
						position={positions.lb}
					/>
					<Position
						className={cn(styles.cb, styles.cbl)}
						position={positions.cbl}
					/>
					<Position className={cn(styles.cb)} position={positions.cb} />
					<Position
						className={cn(styles.cb, styles.cbr)}
						position={positions.cbr}
					/>
					<Position
						className={cn(styles.cb, styles.rb)}
						position={positions.rb}
					/>

					{/* goalkeeper */}
					<Position
						className={cn(styles.gk, {
							[styles.gkAdvanced]: false,
							[styles.gkDrawn]: false
						})}
						position={positions.gk}
					/>
				</div>

				{/* https://www.cssportal.com/style-input-range/  for ranges inputs */}

				<div className={styles.players}>
					<div className={styles.playersTable}>
						<div className={styles.player}>Main</div>
						<TableTitlesMemo />
						{mainPlayers}
					</div>

					<div className={styles.playersTable}>
						<div className={styles.player}>Bench</div>
						{benchPlayers}
					</div>
				</div>
			</div>
		</div>
	);
}
