import { useLayoutEffect } from 'react';
import countries from 'src/assets/data/countries.json';
import leagues from 'src/assets/data/leagues.json';
import teams from 'src/assets/data/teams.json';
import { ICountry } from 'src/interfaces';

import { IUseFirstInitProps } from './useFirstInit.interfaces';

export function useFirstInit({
	setTeamCountry,
	setLeaguesLength,
	setTeamLeague,
	handlerTeam,
	setTeamsFromCurrentLeague
}: IUseFirstInitProps) {
	/**
	 * @info
	 * first init
	 */
	useLayoutEffect(() => {
		const countryteam = countries[0] as ICountry;
		const leagueteam = leagues.find(l => l.countryId === countryteam._id);

		const leaguesCountInCountry = leagues.filter(
			l => l.countryId === countryteam._id
		).length;
		setLeaguesLength(leaguesCountInCountry);

		const teamsFromCurrentLeague = teams.filter(
			t => t.leagueId === leagueteam?._id
		);
		setTeamCountry(countryteam);
		setTeamLeague(leagueteam);
		setTeamsFromCurrentLeague(teamsFromCurrentLeague as any);
		handlerTeam(teamsFromCurrentLeague[0] as any);
	}, []);
}
