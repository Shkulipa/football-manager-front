import { LogoClub } from './LogoClub';
import styles from './MatchDetails.module.scss';
import { IMatchDetailsProps } from './MatchDetails.types';

export function MatchDetails({
	kickOffTeam,
	secondTeam
}: IMatchDetailsProps): JSX.Element {
	return (
		<div className={styles.contentWrapper}>
			<div className={styles.teamsNames}>
				<span>{secondTeam.clubName}</span>
				{secondTeam?.logoClub && <LogoClub logoClub={secondTeam.logoClub} />}
				<span>{secondTeam.goals}</span>
			</div>

			<span className={styles.colon}>:</span>

			<div className={styles.teamsNames}>
				<span>{kickOffTeam.goals}</span>
				{kickOffTeam?.logoClub && <LogoClub logoClub={kickOffTeam.logoClub} />}
				<span>{kickOffTeam.clubName}</span>
			</div>
		</div>
	);
}
