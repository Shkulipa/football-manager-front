import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import players from 'src/assets/data/players.json';
import { ReactComponent as Gamepad } from 'src/assets/icons/gamepad.svg';
import {
	ArrowBack,
	ArrowSlider,
	Button,
	CardTeam,
	Htag,
	PrimaryLayout
} from 'src/components';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { ITeam } from 'src/interfaces';
import { EUserFor, matchSlice } from 'src/store/slices';

import styles from './classicMatch.module.scss';

const MemoTitle = memo(Htag);

export function ClassicMatch() {
	const navigate = useNavigate();
	const { userFor } = useAppSelector(s => s.match);
	const dispatch = useAppDispatch();
	const { setGuests, setHosts, setUserFor } = matchSlice.actions;

	const [hostsLocal, setHostsLocal] = useState<ITeam>();
	const [guestsLocal, setGuestsLocal] = useState<ITeam>();

	const handlerTeamHosts = (hosts: ITeam) => {
		setHostsLocal(hosts);
	};

	const handlerTeamGuests = (guests: ITeam) => {
		setGuestsLocal(guests);
	};

	const handlerMove = (team: EUserFor) => {
		if (!userFor) dispatch(setUserFor(team));
		else dispatch(setUserFor(null));
	};

	const handlerPlay = () => {
		const playersHosts = players
			.filter(p => p.teamId === hostsLocal!._id)
			.map(p => {
				const valuesSkills = Object.values(p.skill);
				const valuesAllSkills = valuesSkills.reduce(
					(total, val) => total + val,
					0
				);
				const skillAvr = valuesAllSkills / valuesSkills.length;
				const fixedSkills = parseInt(skillAvr.toFixed());
				return {
					rating: fixedSkills,
					fitness: 100,
					injured: false,
					...p
				};
			});

		const teamHosts = {
			_id: hostsLocal!._id,
			name: hostsLocal!.clubName,
			manager: 'Aiden 1',
			rating: '100',
			players: [...playersHosts]
		};

		const playersGuest = players
			.filter(p => p.teamId === guestsLocal!._id)
			.map(p => {
				const valuesSkills = Object.values(p.skill);
				const valuesAllSkills = valuesSkills.reduce(
					(total, val) => total + val,
					0
				);
				const skillAvr = valuesAllSkills / valuesSkills.length;
				const fixedSkills = parseInt(skillAvr.toFixed());
				return {
					rating: fixedSkills,
					fitness: 100,
					injured: false,
					...p
				};
			});

		const teamGuests = {
			_id: guestsLocal!._id,
			name: guestsLocal!.clubName,
			manager: 'Aiden 2',
			rating: '100',
			players: [...playersGuest]
		};

		dispatch(setHosts(teamHosts));
		dispatch(setGuests(teamGuests));

		navigate('/classic-match-game');
	};

	const isAvailablePlay = userFor ? (
		<Button onClick={handlerPlay}>Play</Button>
	) : (
		<Gamepad className={styles.gamepad} />
	);

	return (
		<div className={styles.classicMatch}>
			<ArrowBack to={'/'} />

			<PrimaryLayout>
				<div className={styles.content}>
					<MemoTitle tag="h1" className={styles.title}>
						Classic Match
					</MemoTitle>

					<div className={styles.container}>
						<div className={styles.teams}>
							<CardTeam
								title="Hosts"
								team={hostsLocal}
								handlerTeam={handlerTeamHosts}
							/>
							<CardTeam
								title="Guests"
								team={guestsLocal}
								handlerTeam={handlerTeamGuests}
							/>
						</div>

						<div className={styles.playWrapper}>
							<div className={styles.hosts}>
								{userFor === EUserFor.HOSTS && (
									<Gamepad className={styles.gamepad} />
								)}
							</div>
							<div className={styles.manage}>
								<ArrowSlider
									onClick={() => handlerMove(EUserFor.HOSTS)}
									isFlip
									isDisabled={userFor === EUserFor.HOSTS}
								/>
								<div className={styles.isAvailablePlay}>{isAvailablePlay}</div>
								<ArrowSlider
									onClick={() => handlerMove(EUserFor.GUESTS)}
									isDisabled={userFor === EUserFor.GUESTS}
								/>
							</div>
							<div className={styles.guests}>
								{userFor === EUserFor.GUESTS && (
									<Gamepad className={styles.gamepad} />
								)}
							</div>
						</div>
					</div>
				</div>
			</PrimaryLayout>
		</div>
	);
}
