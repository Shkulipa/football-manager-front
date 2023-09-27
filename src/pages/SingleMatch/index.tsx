'use client';

import { useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { CardsContainer } from './containers/CardsContainer';
import { SingleMatchContainer } from './containers/SingleMatchContainer';
import { ISingleMatchProps } from './single-match.types';
import { singleMatchSlice } from './store/single-match.slice';
import { initTeam } from './utils/initTeam/initTeam';
import { Card } from './components/Card';
import { SingleMatchActions } from './components/SingleMatchActions';
import { EMatchSide } from '@/constants/match-sides.enum';

export function SingleMatchPage({ teams }: ISingleMatchProps): JSX.Element {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	// init teams
	const { hosts, guests } = useAppSelector(state => state.singleMatchReducer);
	const initHosts = useMemo(() => initTeam({ currTeam: hosts, teams }), []);
	const initGuests = useMemo(() => initTeam({ currTeam: guests, teams }), []);

	useEffect(() => {
		if (initHosts && initGuests) {
			const teamHosts =
				teams[initHosts.initCountry].leagues[initHosts.initLeague].teams[
					initHosts.initTeam
				];
			const teamGuests =
				teams[initGuests.initCountry].leagues[initGuests.initLeague].teams[
					initGuests.initTeam
				];

			dispatch(setHosts(teamHosts));
			dispatch(setGuests(teamGuests));
		}
	}, [initHosts, initGuests]);

	// handlers for picking teams
	const { setGuests, setHosts, setUserFor } = singleMatchSlice.actions;
	const onChangeTeamHosts = (team: any) => {
		dispatch(setHosts(team));
	};

	const onChangeTeamGuests = (team: any) => {
		dispatch(setGuests(team));
	};

	// handlers start match
	const startGame = async () => router.push(pathname + '/game');
	const hostsHandler = () => {
		dispatch(setUserFor(EMatchSide.HOSTS));
		startGame();
	};
	const aiHandler = () => {
		startGame();
	};
	const guestsHandler = () => {
		dispatch(setUserFor(EMatchSide.GUESTS));
		startGame();
	};

	return (
		<SingleMatchContainer>
			<CardsContainer>
				<Card
					teams={teams}
					onChangeTeam={onChangeTeamHosts}
					initData={initHosts}
				/>
				<Card
					teams={teams}
					onChangeTeam={onChangeTeamGuests}
					initData={initGuests}
				/>
			</CardsContainer>
			<SingleMatchActions
				hostsHandler={hostsHandler}
				aiHandler={aiHandler}
				guestsHandler={guestsHandler}
			/>
		</SingleMatchContainer>
	);
}
