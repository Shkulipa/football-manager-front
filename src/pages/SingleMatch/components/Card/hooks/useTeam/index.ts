import { useCallback, useState } from 'react';
import { IUseTeamProps } from './useTeam.types';

export function useTeam({ teams, onChangeTeam, initData }: IUseTeamProps) {
	// countries
	const [country, setCountry] = useState(initData?.initCountry || 0);
	const [league, setLeague] = useState(initData?.initLeague || 0);
	const [team, setTeam] = useState(initData?.initTeam || 0);

	const isFirstCountry = country === 0;
	const isLastCountry = teams.length - 1 === country;

	const onPrevCountry = useCallback(() => {
		if (isFirstCountry) return;
		setCountry(s => s - 1);
		setLeague(0);
		setTeam(0);
		onChangeTeam(teams[country - 1].leagues[0].teams[0]);
	}, [country, isFirstCountry, onChangeTeam, teams]);

	const onNextCountry = useCallback(() => {
		if (isLastCountry) return;
		setCountry(s => s + 1);
		setLeague(0);
		setTeam(0);
		onChangeTeam(teams[country + 1].leagues[0].teams[0]);
	}, [country, isLastCountry, onChangeTeam, teams]);

	// leagues
	const isFirstLeague = league === 0;
	const isLastLeague = teams[country].leagues.length - 1 === league;

	const onPrevLeague = useCallback(() => {
		if (isFirstLeague) return;
		setLeague(s => s - 1);
		setTeam(0);
		onChangeTeam(teams[country].leagues[league - 1].teams[0]);
	}, [country, isFirstLeague, league, onChangeTeam, teams]);

	const onNextLeague = useCallback(() => {
		if (isLastLeague) return;
		setLeague(s => s + 1);
		setTeam(0);
		onChangeTeam(teams[country].leagues[league + 1].teams[0]);
	}, [country, isLastLeague, league, onChangeTeam, teams]);

	// teams
	const isFirstTeam = team === 0;
	const isLastTeam = teams[country].leagues[league].teams.length - 1 === team;

	const onPrevTeam = useCallback(() => {
		if (isFirstTeam) return;
		setTeam(s => s - 1);
		onChangeTeam(teams[country].leagues[league].teams[team - 1]);
	}, [country, isFirstTeam, league, onChangeTeam, team, teams]);

	const onNextTeam = useCallback(() => {
		if (isLastTeam) return;
		setTeam(s => s + 1);
		onChangeTeam(teams[country].leagues[league].teams[team + 1]);
	}, [country, isLastTeam, league, onChangeTeam, team, teams]);

	return {
		country: {
			countryIdx: country,
			onPrevCountry,
			onNextCountry,
			isFirstCountry,
			isLastCountry
		},
		league: {
			leagueIdx: league,
			onPrevLeague,
			onNextLeague,
			isFirstLeague,
			isLastLeague
		},
		team: {
			teamIdx: team,
			onPrevTeam,
			onNextTeam,
			isFirstTeam,
			isLastTeam
		}
	};
}
