import { PlayerData } from 'src/components';

import { ITeamsMatchProps } from './teamsMatch.interfaces';
import styles from './teamsMatch.module.scss';

export function TeamsMatch({ matchDetails }: ITeamsMatchProps) {
	const { kickOffTeam, secondTeam } = matchDetails;
	const playersTeam1 = secondTeam.players.map((p: any) => (
		<PlayerData className={styles.playerData} key={p.playerID} player={p} />
	));
	const playersTeam2 = kickOffTeam.players.map((p: any) => (
		<PlayerData className={styles.playerData} key={p.playerID} player={p} />
	));

	return (
		<div className={styles.teamsMatch}>
			<div className={styles.team}>
				<div className={styles.text}>{secondTeam.name}</div>

				<div className={styles.players}>
					<div className={styles.grid}>
						<div>#</div>
						<div>Name</div>
						<div>Rating</div>
						<div>Fitness</div>
						<div>Passes</div>
						<div>Shots</div>
						<div>Fouls</div>
						<div>Goals</div>
					</div>

					{playersTeam1}
				</div>
			</div>

			<div className={styles.team}>
				<div className={styles.text}>{kickOffTeam.name}</div>

				<div className={styles.players}>
					<div className={styles.grid}>
						<div>#</div>
						<div>Name</div>
						<div>Rating</div>
						<div>Fitness</div>
						<div>Passes</div>
						<div>Shots</div>
						<div>Fouls</div>
						<div>Goals</div>
					</div>

					{playersTeam2}
				</div>
			</div>
		</div>
	);
}
