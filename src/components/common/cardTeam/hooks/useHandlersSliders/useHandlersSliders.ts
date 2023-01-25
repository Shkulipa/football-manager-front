import countries from 'src/assets/data/countries.json';
import leagues from 'src/assets/data/leagues.json';
import teams from 'src/assets/data/teams.json';
import { ICountry, ILeague, ITeam } from 'src/interfaces';

import { ESliderActions } from '../../cardTeam.interfaces';

import { IUseHandlersSlidersProps } from './useHandlersSliders.interfaces';

export function useHandlersSliders({
	team,
	teamCountry,
	teamLeague,
	teamsFromCurrentLeague,

	setLeaguesLength,
	handlerTeam,
	setTeamCountry,
	setTeamLeague,
	setTeamsFromCurrentLeague
}: IUseHandlersSlidersProps) {
	/**
	 * @info
	 * handler for country
	 */
	const onTeamCountry = (action: ESliderActions) => {
		const currentCountriesPosition = countries.findIndex(
			c => c._id === teamCountry?._id
		);
		let newCountry: ICountry;
		/**
		 * @info
		 * next step
		 */
		if (action === ESliderActions.NEXT) {
			if (currentCountriesPosition + 1 >= countries.length) {
				newCountry = countries[0];
				setTeamCountry(newCountry);
			} else {
				newCountry = countries[currentCountriesPosition + 1];
				setTeamCountry(newCountry);
			}
		}

		/**
		 * @info
		 * back step
		 */
		if (action === ESliderActions.BACK) {
			if (currentCountriesPosition === 0) {
				newCountry = countries[countries.length - 1];
				setTeamCountry(newCountry);
			} else {
				newCountry = countries[currentCountriesPosition - 1];
				setTeamCountry(newCountry);
			}
		}

		/**
		 * @info
		 * counts leagues in country
		 */
		const leaguesCountInCountry = leagues.filter(
			l => l.countryId === newCountry._id
		).length;
		setLeaguesLength(leaguesCountInCountry);

		/**
		 * @info
		 * pick a new league
		 */
		const newLeague = leagues.find(
			l => l.countryId === newCountry._id
		) as ILeague;
		setTeamLeague(newLeague);

		/**
		 * @info
		 * pick a new team
		 */
		const teamsFromNewLeague = teams.filter(t => t.leagueId === newLeague?._id);
		setTeamsFromCurrentLeague(teamsFromNewLeague);
		handlerTeam(teamsFromNewLeague[0]);
	};

	/**
	 * @info
	 * handler for league
	 */
	const onTeamLeague = (action: ESliderActions) => {
		const filterAllLeagues = leagues.filter(
			l => l.countryId === teamCountry?._id
		);
		const currentLeaguePosition = filterAllLeagues.findIndex(
			l => l._id === teamLeague?._id
		);
		let newLeague: ILeague;

		/**
		 * @info
		 * next step
		 */
		if (action === ESliderActions.NEXT) {
			if (currentLeaguePosition + 1 >= filterAllLeagues.length) {
				newLeague = filterAllLeagues[0];
				setTeamLeague(newLeague);
			} else {
				newLeague = filterAllLeagues[currentLeaguePosition + 1];
				setTeamLeague(newLeague);
			}
		}

		/**
		 * @info
		 * back step
		 */
		if (action === ESliderActions.BACK) {
			if (currentLeaguePosition === 0) {
				newLeague = filterAllLeagues[filterAllLeagues.length - 1];
				setTeamLeague(newLeague);
			} else {
				newLeague = filterAllLeagues[currentLeaguePosition - 1];
				setTeamLeague(newLeague);
			}
		}

		/**
		 * @info
		 * set new team from new league
		 */
		const teamsFromNewLeague = teams.filter(t => t.leagueId === newLeague?._id);
		setTeamsFromCurrentLeague(teamsFromNewLeague);
		handlerTeam(teamsFromNewLeague[0]);
	};

	/**
	 * @info
	 * handler for team
	 */
	const onTeam = (action: ESliderActions) => {
		const currentTeamPosition = teamsFromCurrentLeague.findIndex(
			t => t._id === team?._id
		);
		let newTeam: ITeam;

		/**
		 * @info
		 * next step
		 */
		if (action === ESliderActions.NEXT) {
			if (currentTeamPosition + 1 >= teamsFromCurrentLeague.length) {
				newTeam = teamsFromCurrentLeague[0];
				handlerTeam(newTeam);
			} else {
				newTeam = teamsFromCurrentLeague[currentTeamPosition + 1];
				handlerTeam(newTeam);
			}
		}

		/**
		 * @info
		 * back step
		 */
		if (action === ESliderActions.BACK) {
			if (currentTeamPosition === 0) {
				newTeam = teamsFromCurrentLeague[teamsFromCurrentLeague.length - 1];
				handlerTeam(newTeam);
			} else {
				newTeam = teamsFromCurrentLeague[currentTeamPosition - 1];
				handlerTeam(newTeam);
			}
		}
	};

	return { onTeamCountry, onTeamLeague, onTeam };
}
