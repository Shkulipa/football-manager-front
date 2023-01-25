import cn from 'classnames';
import { useLayoutEffect, useState } from 'react';
import { useAppSelector } from 'src/hooks';
import { EPlayFor } from 'src/store/slices';

import { Player, Position } from './components';
import styles from './tactics.module.scss';

export function Tactics() {
	const { hosts, guests, pitchSize, playFor, matchDetails } = useAppSelector(
		s => s.match
	);

	const teamPlayerPlay = playFor === EPlayFor.HOSTS ? hosts : guests;
	const [positions, setPositions] = useState({
		lst: {
			role: '',
			currentPlayer: null
		},
		st: {
			role: '',
			currentPlayer: null
		},
		rst: {
			role: '',
			currentPlayer: null
		},

		lw: {
			role: '',
			currentPlayer: null
		},
		lam: {
			role: '',
			currentPlayer: null
		},
		am: {
			role: '',
			currentPlayer: null
		},
		ram: {
			role: '',
			currentPlayer: null
		},
		rw: {
			role: '',
			currentPlayer: null
		},

		lm: {
			role: '',
			currentPlayer: null
		},
		lcm: {
			role: '',
			currentPlayer: null
		},
		cm: {
			role: '',
			currentPlayer: null
		},
		rcm: {
			role: '',
			currentPlayer: null
		},
		rm: {
			role: '',
			currentPlayer: null
		},

		lwb: {
			role: '',
			currentPlayer: null
		},
		ldm: {
			role: '',
			currentPlayer: null
		},
		dm: {
			role: '',
			currentPlayer: null
		},
		rdm: {
			role: '',
			currentPlayer: null
		},
		rwb: {
			role: '',
			currentPlayer: null
		},

		lb: {
			role: '',
			currentPlayer: null
		},
		cbl: {
			role: '',
			currentPlayer: null
		},
		cb: {
			role: '',
			currentPlayer: null
		},
		cbr: {
			role: '',
			currentPlayer: null
		},
		rb: {
			role: '',
			currentPlayer: null
		},

		// [340, 0-30]
		gk: {
			role: '',
			currentPlayer: null
		}
	});

	// console.log(matchDetails);

	useLayoutEffect(() => {
		const mainPlayers = teamPlayerPlay.players.filter(p => p.role === 'main');
		/* .sort(function (a, b) {
				const order = ['GK', 'LB', 'CB', 'RB', 'LM', 'CM', 'RM', 'ST'];
				return order.indexOf(a.position) - order.indexOf(b.position);
			}); */
	}, [teamPlayerPlay.players]);

	/* const mainPlayers = teamPlayerPlay.players
		.filter(p => p.role === 'main')
		.sort(function (a, b) {
			const order = ['GK', 'LB', 'CB', 'RB', 'LM', 'CM', 'RM', 'ST'];
			return order.indexOf(a.position) - order.indexOf(b.position);
		})
		.map(p => <Player key={p._id} player={p} />); */

	const sparePlayers = teamPlayerPlay.players
		.filter(p => p.role === 'spare')
		.map(p => <div key={p._id}>{p.name}</div>);
	const reservePlayers = teamPlayerPlay.players
		.filter(p => p.role === 'reserve')
		.map(p => <div key={p._id}>{p.name}</div>);

	return (
		<div className={styles.tactics}>
			<div
				className={styles.field}
				style={{
					width: pitchSize.pitchWidth / 2,
					height: pitchSize.pitchHeight / 2
				}}
			>
				{/* attackers */}
				<Position
					className={cn(styles.st, styles.lst)}
					positionData={positions.lst}
				/>
				<Position className={cn(styles.st)} positionData={positions.st} />
				<Position
					className={cn(styles.st, styles.rst)}
					positionData={positions.rst}
				/>

				{/* attackers midfielders */}
				<Position
					className={cn(styles.am, styles.lw)}
					positionData={positions.lw}
				/>
				<Position
					className={cn(styles.am, styles.lam)}
					positionData={positions.lam}
				/>
				<Position className={cn(styles.am)} positionData={positions.am} />
				<Position
					className={cn(styles.am, styles.ram)}
					positionData={positions.ram}
				/>
				<Position
					className={cn(styles.am, styles.rw)}
					positionData={positions.rw}
				/>

				{/* midfielders */}
				<Position
					className={cn(styles.cm, styles.lm)}
					positionData={positions.lm}
				/>
				<Position
					className={cn(styles.cm, styles.lcm)}
					positionData={positions.lcm}
				/>
				<Position className={cn(styles.cm)} positionData={positions.cm} />
				<Position
					className={cn(styles.cm, styles.rcm)}
					positionData={positions.rcm}
				/>
				<Position
					className={cn(styles.cm, styles.rm)}
					positionData={positions.rm}
				/>

				{/* between midfielders & deffenders */}
				<Position
					className={cn(styles.dm, styles.lwb)}
					positionData={positions.lwb}
				/>
				<Position
					className={cn(styles.dm, styles.ldm)}
					positionData={positions.ldm}
				/>
				<Position className={cn(styles.dm)} positionData={positions.dm} />
				<Position
					className={cn(styles.dm, styles.rdm)}
					positionData={positions.rdm}
				/>
				<Position
					className={cn(styles.dm, styles.rwb)}
					positionData={positions.rwb}
				/>

				{/* defenders */}
				<Position
					className={cn(styles.cb, styles.lb)}
					positionData={positions.lb}
				/>
				<Position
					className={cn(styles.cb, styles.cbl)}
					positionData={positions.cbl}
				/>
				<Position className={cn(styles.cb)} positionData={positions.cb} />
				<Position
					className={cn(styles.cb, styles.cbr)}
					positionData={positions.cbr}
				/>
				<Position
					className={cn(styles.cb, styles.rb)}
					positionData={positions.rb}
				/>

				{/* goalkeeper */}
				<Position
					className={cn(styles.gk, {
						[styles.gkAdvanced]: false,
						[styles.gkDrawn]: false
					})}
					positionData={positions.gk}
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
