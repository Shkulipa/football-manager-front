'use client';

import { useSimulateSingleMatch } from './hooks/useSimulateSingleMatch';
import { useState } from 'react';
import { Match, Tactics } from './modules';
import { Tabs } from './components';
import { Options, Statistics, Teams } from '@/components';
import { useAppSelector } from '@/hooks/redux';
import { GameLayout } from '@/layouts/GameLayout/GameLayout';

export function Game(): JSX.Element {
	const { userFor } = useAppSelector(s => s.singleMatchReducer);

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
			tabContent = <Statistics matchDetails={matchDetails!} />;
			break;
		case 3:
			tabContent = <Teams matchDetails={matchDetails} />;
			break;
		case 4:
			tabContent = (
				<Options
					optionsMatch={optionsMatch}
					optionsMatchHandler={optionsMatchHandler}
				/>
			);
			break;
		case 5:
			tabContent = <Tactics />;
			break;
		default:
			<></>;
	}

	const commonTabs = ['Match', 'Statistics', 'Teams', 'Options'];
	const tabs = userFor ? [...commonTabs, 'Tactic'] : commonTabs;

	return (
		<GameLayout>
			<Tabs tabHandler={tabHandler} tabs={tabs} />
			{tabContent}
		</GameLayout>
	);
}
