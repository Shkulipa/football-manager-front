import { useLayoutEffect, useState } from 'react';
import { ICountry, ILeague, ITeam } from 'src/interfaces';
import { parseTeamReatingInStars } from 'src/utils';

import { ESliderActions, ICardTeamProps } from './cardTeam.interfaces';
import styles from './cardTeam.module.scss';
import { CountryBlock, LeagueBlock, TeamBlock, Title } from './components';
import { useFirstInit, useHandlersSliders } from './hooks';

export function CardTeam({ title, team, handlerTeam }: ICardTeamProps) {
	const [teamCountry, setTeamCountry] = useState<ICountry>();
	const [teamLeague, setTeamLeague] = useState<ILeague>();
	const [leaguesLength, setLeaguesLength] = useState<number>();
	const [teamsFromCurrentLeague, setTeamsFromCurrentLeague] = useState<ITeam[]>(
		[]
	);

	/**
	 * @info
	 * init first teams when you entered on the page
	 */
	useFirstInit({
		setLeaguesLength,
		handlerTeam,
		setTeamCountry,
		setTeamLeague,
		setTeamsFromCurrentLeague
	});

	/**
	 * @info
	 * handlers slider
	 */
	const { onTeam, onTeamCountry, onTeamLeague } = useHandlersSliders({
		setLeaguesLength,
		handlerTeam,
		setTeamCountry,
		setTeamLeague,
		setTeamsFromCurrentLeague,
		teamsFromCurrentLeague,
		team,
		teamCountry,
		teamLeague
	});

	/**
	 * @info
	 * value for rating in stars
	 */
	const [skillteam, setSkillteam] = useState<number>(0);
	useLayoutEffect(() => {
		if (team?.skills) {
			const skillValue = parseTeamReatingInStars(team.skills);
			setSkillteam(skillValue);
		}
	}, [team?._id]);

	return (
		<div className={styles.card}>
			<Title>{title}</Title>

			<CountryBlock
				country={teamCountry}
				back={() => onTeamCountry(ESliderActions.BACK)}
				next={() => onTeamCountry(ESliderActions.NEXT)}
			/>

			<LeagueBlock
				league={teamLeague}
				back={() => onTeamLeague(ESliderActions.BACK)}
				next={() => onTeamLeague(ESliderActions.NEXT)}
				isDisabled={leaguesLength === 1}
			/>

			<TeamBlock
				back={() => onTeam(ESliderActions.BACK)}
				next={() => onTeam(ESliderActions.NEXT)}
				skillteam={skillteam}
				isDisabled={teamsFromCurrentLeague.length <= 1}
				team={team}
			/>
		</div>
	);
}
