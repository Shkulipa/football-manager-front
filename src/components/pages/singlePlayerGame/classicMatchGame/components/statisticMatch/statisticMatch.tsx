import { StatisticItem } from 'src/components';

import { IStatisticMatchProps } from './statisticMatch.interfaces';
import styles from './statisticMatch.module.scss';

export function StatisticMatch({ matchDetails }: IStatisticMatchProps) {
	return (
		<div className={styles.statisticTab}>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails.secondTeam.name}
				middleText=""
				rightText={matchDetails.kickOffTeam.name}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails.secondTeamStatistics.goals}
				middleText="Goals"
				rightText={matchDetails.kickOffTeamStatistics.goals}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails.secondTeamStatistics.shots.total}
				middleText="Total Shots"
				rightText={matchDetails.kickOffTeamStatistics.shots.total}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails.secondTeamStatistics.shots.on}
				middleText="Shots in target"
				rightText={matchDetails.kickOffTeamStatistics.shots.on}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails.secondTeamStatistics.corners}
				middleText="Corners"
				rightText={matchDetails.kickOffTeamStatistics.corners}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails.secondTeamStatistics.fouls}
				middleText="Fouls"
				rightText={matchDetails.kickOffTeamStatistics.fouls}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails.secondTeamStatistics.freekicks}
				middleText="Freekicks"
				rightText={matchDetails.kickOffTeamStatistics.freekicks}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails.secondTeamStatistics.penalties}
				middleText="Penalties"
				rightText={matchDetails.kickOffTeamStatistics.penalties}
			/>
		</div>
	);
}
