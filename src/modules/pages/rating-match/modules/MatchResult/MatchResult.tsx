import { Button, Loader, MatchDetails } from '@/components';
import { IMatchResultProps } from './MatchResult.types';
import { InfoReward } from './components/InfoReward';
import styles from './MatchResult.module.scss';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes.enum';

export const MatchResult = ({
	matchResult
}: IMatchResultProps): JSX.Element => {
	const router = useRouter();

	if (!matchResult || !matchResult.statistics || !matchResult.reward)
		return <Loader />;

	return (
		<div className={styles.matchResultWrapper}>
			<MatchDetails
				kickOffTeam={{
					clubName: matchResult.player2.team.clubName,
					logoClub: matchResult.player2.team.logoClub,
					goals: matchResult.statistics.host.goals
				}}
				secondTeam={{
					clubName: matchResult.player1.team.clubName,
					logoClub: matchResult.player1.team.logoClub,
					goals: matchResult.statistics.guests.goals
				}}
			/>

			<div className={styles.rewardsWrapper}>
				<InfoReward reward={matchResult.reward.rewardPlayer1} />
				<InfoReward reward={matchResult.reward.rewardPlayer2} />
			</div>

			<Button onClick={() => router.replace(ROUTES.RATING)}>
				Go to Rating Match
			</Button>
		</div>
	);
};
