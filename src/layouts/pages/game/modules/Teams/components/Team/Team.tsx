import styles from './Team.module.scss';
import { ITeamProps } from './Team.types';
import { Player } from './components/Player/Player';

export function Team({ team }: ITeamProps): JSX.Element {
	const players = team.players.map(p => (
		<Player className={styles.playerData} key={p.playerID} player={p} />
	));

	return (
		<div className={styles.team}>
			<div className={styles.text}>{team.name}</div>

			<div className={styles.players}>
				<div className={styles.grid}>
					<div>#</div>
					<div>Name</div>
					<div>Fitness</div>
					<div>Passes</div>
					<div>Shots</div>
					<div>Fouls</div>
					<div>Goals</div>
					<div>Rating</div>
				</div>

				{players}
			</div>
		</div>
	);
}
