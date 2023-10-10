import React from 'react';
import { IMatchProps } from './Match.types';
import { FootballField, Playback, Speed, TimeLine } from './components';
import styles from './Match.module.scss';
import { MatchDetails } from '../../components';

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
	return (
		<>
			{matchDetails && <MatchDetails matchDetails={matchDetails} />}
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
				/>
			</div>
		</>
	);
}
