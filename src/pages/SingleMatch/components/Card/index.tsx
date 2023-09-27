'use client';

import { ICardProps } from './Card.types';
import styles from './Card.module.scss';
import { Country } from './components/Content/Country';
import { League } from './components/Content/League';
import BlockContainer from './containers/BlockContainer';
import { Team } from './components/Content/Team';
import { useTeam } from './hooks/useTeam';

export function Card({
	teams,
	onChangeTeam,
	initData
}: ICardProps): JSX.Element {
	// main logic
	const { country, league, team } = useTeam({ teams, onChangeTeam, initData });

	// destructuring
	const {
		countryIdx,
		isFirstCountry,
		isLastCountry,
		onNextCountry,
		onPrevCountry
	} = country;
	const { leagueIdx, onPrevLeague, onNextLeague, isFirstLeague, isLastLeague } =
		league;
	const { teamIdx, onPrevTeam, onNextTeam, isFirstTeam, isLastTeam } = team;

	// get value from teams' array
	const countryData = teams[countryIdx];
	const leagueData = countryData.leagues[leagueIdx];
	const teamData = leagueData.teams[teamIdx];

	return (
		<div className={styles.card}>
			<BlockContainer
				onPrevClick={onPrevCountry}
				onNextClick={onNextCountry}
				isDisabledPrevBtn={isFirstCountry}
				isDisabledNextBtn={isLastCountry}
			>
				<Country img={countryData.flag} text={countryData.name} />
			</BlockContainer>
			<BlockContainer
				onPrevClick={onPrevLeague}
				onNextClick={onNextLeague}
				isDisabledPrevBtn={isFirstLeague}
				isDisabledNextBtn={isLastLeague}
			>
				<League img={leagueData.logoLeague} text={leagueData.name} />
			</BlockContainer>
			<BlockContainer
				onPrevClick={onPrevTeam}
				onNextClick={onNextTeam}
				isDisabledPrevBtn={isFirstTeam}
				isDisabledNextBtn={isLastTeam}
			>
				<Team
					img={teamData.logoClub}
					text={teamData.clubName}
					skills={teamData.skills}
				/>
			</BlockContainer>
		</div>
	);
}
