import { memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Gamepad } from 'src/assets/icons/gamepad.svg';
import {
	ArrowBack,
	ArrowSlider,
	CardTeam,
	Htag,
	PrimaryLayout
} from 'src/components';
import { ITeam } from 'src/interfaces';

import styles from './classicMatch.module.scss';

const MemoTitle = memo(Htag);

enum ETeam {
	LEFT = 'left',
	RIGHT = 'right'
}

export function ClassicMatch() {
	const [hosts, setHosts] = useState<ITeam>();
	const [guests, setGuests] = useState<ITeam>();

	const [controllPlayer, setControllPlayer] = useState<ETeam | null>();

	const handlerMove = (team: ETeam) => {
		if (team === ETeam.LEFT) {
			if (!controllPlayer) return setControllPlayer(ETeam.LEFT);
			if (controllPlayer) return setControllPlayer(null);
		}

		if (team === ETeam.RIGHT) {
			if (!controllPlayer) return setControllPlayer(ETeam.RIGHT);
			if (controllPlayer) return setControllPlayer(null);
		}
	};

	return (
		<div className={styles.classicMatch}>
			<ArrowBack to={'/'} />

			<PrimaryLayout>
				<div className={styles.content}>
					<MemoTitle tag="h1" className={styles.title}>
						Classic Match
					</MemoTitle>

					<div className={styles.teams}>
						<div>
							<CardTeam title="Hosts" team={hosts} setTeam={setHosts} />
							{controllPlayer === ETeam.LEFT && (
								<Gamepad className={styles.gamepad} />
							)}
						</div>

						<div>
							<CardTeam title="Guests" team={guests} setTeam={setGuests} />
							{controllPlayer === ETeam.RIGHT && (
								<Gamepad className={styles.gamepad} />
							)}
						</div>
					</div>

					<div className={styles.playWrapper}>
						<ArrowSlider
							onClick={() => handlerMove(ETeam.LEFT)}
							isFlip
							isDisabled={controllPlayer === ETeam.LEFT}
						/>
						{!controllPlayer && <Gamepad className={styles.gamepad} />}
						{controllPlayer && <NavLink to="/classic-match-game">Play</NavLink>}
						<ArrowSlider
							onClick={() => handlerMove(ETeam.RIGHT)}
							isDisabled={controllPlayer === ETeam.RIGHT}
						/>
					</div>
				</div>
			</PrimaryLayout>
		</div>
	);
}
