import styles from './Teams.module.scss';
import { ITeamsProps } from './Teams.types';
import { Team } from './components';

export function Teams({ matchDetails }: ITeamsProps) {
	if (!matchDetails) return;

	return (
		<div className={styles.teamsMatch}>
			<Team team={matchDetails.secondTeam} />
			<Team team={matchDetails.kickOffTeam} />
		</div>
	);
}
