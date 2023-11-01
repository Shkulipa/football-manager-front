import { IStatisticsProps } from './Statistics.types';
import { StatisticItem } from './components';
import styles from './Statistic.module.scss';
import { MatchDetails } from '../../components';

export function Statistics({ matchDetails }: IStatisticsProps): JSX.Element {
	return (
		<div className={styles.statisticTab}>
			{matchDetails && <MatchDetails matchDetails={matchDetails} />}
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails?.secondTeamStatistics.shots.total || 0}
				middleText="Total Shots"
				rightText={matchDetails?.kickOffTeamStatistics.shots.total || 0}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails?.secondTeamStatistics.shots.on || 0}
				middleText="Shots in target"
				rightText={matchDetails?.kickOffTeamStatistics.shots.on || 0}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails?.secondTeamStatistics.corners || 0}
				middleText="Corners"
				rightText={matchDetails?.kickOffTeamStatistics.corners || 0}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails?.secondTeamStatistics.fouls || 0}
				middleText="Fouls"
				rightText={matchDetails?.kickOffTeamStatistics.fouls || 0}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails?.secondTeamStatistics.freekicks || 0}
				middleText="Freekicks"
				rightText={matchDetails?.kickOffTeamStatistics.freekicks || 0}
			/>
			<StatisticItem
				className={styles.statisticItem}
				leftText={matchDetails?.secondTeamStatistics.penalties || 0}
				middleText="Penalties"
				rightText={matchDetails?.kickOffTeamStatistics.penalties || 0}
			/>
		</div>
	);
}
