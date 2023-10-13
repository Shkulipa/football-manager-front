'use client';

import styles from './Game.module.scss';
import { useValidateMatch } from './hooks/useValidateMatch';
import { useSimulateSingleMatch } from './hooks/useSimulateSingleMatch';
import { Tabs } from './components/Tabs/Tabs';
import { useState } from 'react';
import { Match, Options, Statistics, Teams } from './modules';
import { PaddingContainer } from '@/containers';

export function Game(): JSX.Element {
	useValidateMatch();
	const {
		matchDetails,
		speed,
		speedDown,
		speedUp,
		isPlay,
		isOverMatch,
		handlerPlayback,
		optionsMatch,
		optionsMatchHandler,
		currentIteration,
		time
	} = useSimulateSingleMatch();

	const [tab, setTab] = useState(1);
	const tabHandler = (tab: number) => {
		setTab(tab);
	};

	let tabContent: React.ReactNode;
	switch (tab) {
		case 1:
			tabContent = (
				<Match
					currentIteration={currentIteration}
					handlerPlayback={handlerPlayback}
					isOverMatch={isOverMatch}
					isPlay={isPlay}
					matchDetails={matchDetails}
					optionsMatch={optionsMatch}
					speed={speed}
					speedDown={speedDown}
					speedUp={speedUp}
					time={time}
				/>
			);
			break;
		case 2:
			tabContent = <Statistics matchDetails={matchDetails} />;
			break;
		case 3:
			tabContent = <Teams matchDetails={matchDetails} />;
			break;
		case 5:
			tabContent = (
				<Options
					optionsMatch={optionsMatch}
					optionsMatchHandler={optionsMatchHandler}
				/>
			);
			break;
		default:
			<></>;
	}

	return (
		<div className={styles.game}>
			<PaddingContainer>
				<div className={styles.match}>
					<Tabs tabHandler={tabHandler} />
					{tabContent}
				</div>
			</PaddingContainer>
		</div>
	);
}
