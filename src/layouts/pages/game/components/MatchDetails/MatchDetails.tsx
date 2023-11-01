import { LogoClub } from './LogoClub';
import styles from './MatchDetails.module.scss';
import { IMatchDetailsProps } from './MatchDetails.types';

export function MatchDetails({
	matchDetails
}: IMatchDetailsProps): JSX.Element {
	return (
		<div className={styles.contentWrapper}>
			<div className={styles.teamsNames}>
				<span>{matchDetails.secondTeam.name}</span>
				<LogoClub logoClub={matchDetails.secondTeam.logoClub} />
				<span>{matchDetails.secondTeamStatistics.goals}</span>
			</div>

			<span className={styles.colon}>:</span>

			<div className={styles.teamsNames}>
				<span>{matchDetails.kickOffTeamStatistics.goals}</span>
				<LogoClub logoClub={matchDetails.kickOffTeam.logoClub} />
				<span>{matchDetails.kickOffTeam.name}</span>
			</div>
		</div>
	);
}
