import { memo, useState } from 'react';
import { ReactComponent as Gamepad } from 'src/assets/icons/gamepad.svg';
import { ArrowBack, ArrowSlider, CardTeam, Htag } from 'src/components';
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

	const handlerStartMatch = () => {
		const test = 'test';
	};

	return (
		<div className={styles.classicMatch}>
			<ArrowBack to={'/'} />

			<div className={styles.container}>
				<div className={styles.content}>
					<MemoTitle tag="h1" className={styles.title}>
						Classic Match
					</MemoTitle>

					<div className={styles.teams}>
						<div>
							<CardTeam title="hosts" team={hosts} setTeam={setHosts} />
							{controllPlayer === ETeam.LEFT && (
								<Gamepad className={styles.gamepad} />
							)}
						</div>

						<div>
							<CardTeam title="guests" team={guests} setTeam={setGuests} />
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
						{controllPlayer && (
							<button onClick={handlerStartMatch}>Play</button>
						)}
						<ArrowSlider
							onClick={() => handlerMove(ETeam.RIGHT)}
							isDisabled={controllPlayer === ETeam.RIGHT}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
