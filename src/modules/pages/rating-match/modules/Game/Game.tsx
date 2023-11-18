import { IGameProps } from './Game.types';
import {
	FootballField,
	TimeLine
} from '@/modules/pages/game/modules/Match/components';
import { useCallback, useState } from 'react';

import { Options } from '@/components/match/Options/Options';
import {
	IOptionsMatch,
	Loader,
	MatchDetails,
	Statistics,
	Teams
} from '@/components';
import { Tabs } from '@/modules/pages/game/components';
import { GameLayout } from '@/layouts/GameLayout/GameLayout';
import { Tactic } from '../Tactic/Tactic';
import { useAppSelector } from '@/hooks/redux';

export const Game = ({
	sockets,
	gameLength,
	matchIteration
}: IGameProps): JSX.Element => {
	const { initUserTeam, matchDetails } = useAppSelector(
		s => s.ratingMatchReducer
	);
	const [tab, setTab] = useState(1);
	const tabHandler = (tab: number) => {
		setTab(tab);
	};

	// options viewable on data on football field
	const [optionsMatch, setOptionsMatch] = useState({
		isShowNumber: true,
		isShowName: true,
		isShowFitness: true,
		isShowCoordinates: false,
		isShowChanged: true
	});
	const optionsMatchHandler = useCallback((options: IOptionsMatch) => {
		setOptionsMatch(options);
	}, []);

	if (!sockets || !matchDetails) return <Loader />;

	let tabContent: React.ReactNode;
	switch (tab) {
		case 1: {
			/**
			 * info
			 * 5400 = 90 sec
			 * in our case, 90 sec - it is a 90 min in real football match
			 */
			const timeForIteration = 5400 / gameLength;
			const time = matchIteration * timeForIteration;
			tabContent = (
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
					<FootballField
						matchDetails={matchDetails}
						optionsMatch={optionsMatch}
					/>
					<TimeLine
						currentIteration={matchIteration}
						time={time}
						gameLength={gameLength}
						isPlay
					/>
				</>
			);
			break;
		}
		case 2:
			tabContent = <Statistics matchDetails={matchDetails} />;
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
			tabContent = <Tactic />;
			break;
		default:
			<></>;
	}

	const commonTabs = ['Match', 'Statistics', 'Teams', 'Options'];
	const tabs = initUserTeam ? [...commonTabs, 'Tactic'] : commonTabs;

	return (
		<GameLayout>
			<Tabs tabHandler={tabHandler} tabs={tabs} />
			{tabContent}
		</GameLayout>
	);
};
