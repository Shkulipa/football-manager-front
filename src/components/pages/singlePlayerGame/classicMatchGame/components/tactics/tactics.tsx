import cn from 'classnames';
import { useLayoutEffect, useState } from 'react';
import { useAppSelector } from 'src/hooks';
import { EPlayFor } from 'src/store/slices';

import { Player, Position } from './components';
import { ITacticsProps } from './tacticks';
import styles from './tactics.module.scss';

const step = 30;

export function Tactics({ matchDetails, setMatchDetails }: ITacticsProps) {
	const { pitchSize, playFor } = useAppSelector(s => s.match);

	const [positions, setPositions] = useState({
		lst: {
			coordinates: [450, 435],
			currentPlayer: null
		},

		st: {
			coordinates: [325, 435],
			currentPlayer: null
		},
		rst: {
			coordinates: [200, 435],
			currentPlayer: null
		},

		lw: {
			coordinates: [575, 350],
			currentPlayer: null
		},

		lam: {
			coordinates: [450, 350],
			currentPlayer: null
		},

		am: {
			coordinates: [325, 350],
			currentPlayer: null
		},

		ram: {
			coordinates: [250, 350],
			currentPlayer: null
		},

		rw: {
			coordinates: [75, 350],
			currentPlayer: null
		},

		lm: {
			coordinates: [575, 265],
			currentPlayer: null
		},

		lcm: {
			coordinates: [450, 265],
			currentPlayer: null
		},

		cm: {
			coordinates: [325, 265],
			currentPlayer: null
		},

		rcm: {
			coordinates: [200, 265],
			currentPlayer: null
		},

		rm: {
			coordinates: [75, 265],
			currentPlayer: null
		},

		lwb: {
			coordinates: [575, 175],
			currentPlayer: null
		},

		ldm: {
			coordinates: [450, 175],
			currentPlayer: null
		},

		dm: {
			coordinates: [325, 175],
			currentPlayer: null
		},

		rdm: {
			coordinates: [200, 175],
			currentPlayer: null
		},

		rwb: {
			coordinates: [75, 175],
			currentPlayer: null
		},

		lb: {
			coordinates: [575, 85],
			currentPlayer: null
		},

		cbl: {
			coordinates: [450, 85],
			currentPlayer: null
		},

		cb: {
			coordinates: [325, 85],
			currentPlayer: null
		},

		cbr: {
			coordinates: [200, 85],
			currentPlayer: null
		},

		rb: {
			coordinates: [75, 85],
			currentPlayer: null
		},

		gk: {
			coordinates: [325, 15],
			currentPlayer: null
		}
	});

	useLayoutEffect(() => {
		const playerTeam =
			playFor === EPlayFor.HOSTS
				? matchDetails.secondTeam.players
				: matchDetails.kickOffTeam.players;

		const playersPosition: any = Object.assign({}, positions);

		playerTeam.forEach(p => {
			const x = p.startPOS[0];
			const y = p.startPOS[1];

			for (const [key, value] of Object.entries(positions)) {
				if (
					value.coordinates[0] - step <= x &&
					value.coordinates[0] + step >= x &&
					value.coordinates[1] - step <= y &&
					value.coordinates[1] + step >= y
				) {
					playersPosition[key].currentPlayer = p;
				}
			}
		});

		setPositions(s => ({ ...s, ...playersPosition }));
	}, []);

	/* const mainPlayers = teamPlayerPlay.players
		.filter(p => p.role === 'main')
		.sort(function (a, b) {
			const order = ['GK', 'LB', 'CB', 'RB', 'LM', 'CM', 'RM', 'ST'];
			return order.indexOf(a.position) - order.indexOf(b.position);
		})
		.map(p => <Player key={p._id} player={p} />); */

	/* 	const sparePlayers = teamPlayerPlay.players
		.filter(p => p.role === 'spare')
		.map(p => <div key={p._id}>{p.name}</div>);
	const reservePlayers = teamPlayerPlay.players
		.filter(p => p.role === 'reserve')
		.map(p => <div key={p._id}>{p.name}</div>); */

	return (
		<div className={styles.tactics}>
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
					player={positions.lst}
				/>
				<Position className={cn(styles.st)} player={positions.st} />
				<Position
					className={cn(styles.st, styles.rst)}
					player={positions.rst}
				/>

				{/* attackers midfielders */}
				<Position className={cn(styles.am, styles.lw)} player={positions.lw} />
				<Position
					className={cn(styles.am, styles.lam)}
					player={positions.lam}
				/>
				<Position className={cn(styles.am)} player={positions.am} />
				<Position
					className={cn(styles.am, styles.ram)}
					player={positions.ram}
				/>
				<Position className={cn(styles.am, styles.rw)} player={positions.rw} />

				{/* midfielders */}
				<Position className={cn(styles.cm, styles.lm)} player={positions.lm} />
				<Position
					className={cn(styles.cm, styles.lcm)}
					player={positions.lcm}
				/>
				<Position className={cn(styles.cm)} player={positions.cm} />
				<Position
					className={cn(styles.cm, styles.rcm)}
					player={positions.rcm}
				/>
				<Position className={cn(styles.cm, styles.rm)} player={positions.rm} />

				{/* between midfielders & deffenders */}
				<Position
					className={cn(styles.dm, styles.lwb)}
					player={positions.lwb}
				/>
				<Position
					className={cn(styles.dm, styles.ldm)}
					player={positions.ldm}
				/>
				<Position className={cn(styles.dm)} player={positions.dm} />
				<Position
					className={cn(styles.dm, styles.rdm)}
					player={positions.rdm}
				/>
				<Position
					className={cn(styles.dm, styles.rwb)}
					player={positions.rwb}
				/>

				{/* defenders */}
				<Position className={cn(styles.cb, styles.lb)} player={positions.lb} />
				<Position
					className={cn(styles.cb, styles.cbl)}
					player={positions.cbl}
				/>
				<Position className={cn(styles.cb)} player={positions.cb} />
				<Position
					className={cn(styles.cb, styles.cbr)}
					player={positions.cbr}
				/>
				<Position className={cn(styles.cb, styles.rb)} player={positions.rb} />

				{/* goalkeeper */}
				<Position
					className={cn(styles.gk, {
						[styles.gkAdvanced]: false,
						[styles.gkDrawn]: false
					})}
					player={positions.gk}
				/>
			</div>

			<div className={styles.team}>
				{/* {mainPlayers} */}
				{/* {sparePlayers}
				{reservePlayers} */}
			</div>
		</div>
	);
}
