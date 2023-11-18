import React from 'react';
import { IMatchProps } from './Match.types';
import { FootballField, Playback, Speed, TimeLine } from './components';
import styles from './Match.module.scss';
import { gameLength } from '@/constants';
import { MatchDetails } from '@/components';

export function Match({
	currentIteration,
	handlerPlayback,
	isPlay,
	matchDetails,
	speed,
	speedDown,
	speedUp,
	time,
	isOverMatch,
	optionsMatch
}: IMatchProps): JSX.Element {
	if (!matchDetails) return <></>;

	return (
		<>
			<MatchDetails
				kickOffTeam={{
					clubName: matchDetails.kickOffTeam.name,
					logoClub: matchDetails.kickOffTeam.logoClub,
					goals: matchDetails.kickOffTeamStatistics.goals
				}}
				secondTeam={{
					clubName: matchDetails.secondTeam.name,
					logoClub: matchDetails.secondTeam.logoClub,
					goals: matchDetails.secondTeamStatistics.goals
				}}
			/>
			<FootballField matchDetails={matchDetails} optionsMatch={optionsMatch} />
			<div className={styles.control}>
				<Playback
					handlerPlayback={handlerPlayback}
					isOverMatch={isOverMatch}
					isPlay={isPlay}
				/>
				<Speed
					speed={speed}
					speedDown={speedDown}
					speedUp={speedUp}
					isOverMatch={isOverMatch}
				/>
				<TimeLine
					currentIteration={currentIteration}
					isPlay={isPlay}
					time={time}
					gameLength={gameLength}
				/>
			</div>
		</>
	);
}
