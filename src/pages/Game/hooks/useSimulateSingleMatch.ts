import {
	IMatchDetails,
	initiateGame,
	playIteration,
	startSecondHalf
} from 'footballsimulationengine';
import { SWRFetcher } from '@/SWR/SWR.fetcher';
import { gameLength, pitchSize, timeForOneIteration } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { singleMatchSlice } from '@/pages/SingleMatch/store/single-match.slice';
import { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { parsePlayersHelper } from '../utils/parsePlayers.helper';
import { IRealTeamFullInfo } from '@/types/real-team-full-info';
import { IOptionsMatch } from '../modules/Match/components/FootballField/types/optionsMatch.type';

export interface IUseSimulateSingleMatchRes {
	matchDetails?: IMatchDetails | null;
	currentIteration: number;
	isPlay: boolean;
	speed: number;
	time: number;
	isOverMatch: boolean;
	optionsMatch: IOptionsMatch;
	speedUp: () => void;
	speedDown: () => void;
	handlerPlayback: () => void;
	optionsMatchHandler: (options: IOptionsMatch) => void;
}

export function useSimulateSingleMatch(): IUseSimulateSingleMatchRes {
	const dispatch = useAppDispatch();
	const { hosts, guests, matchDetails } = useAppSelector(
		state => state.singleMatchReducer
	);

	// options match
	const { setMatchDetails, reset } = singleMatchSlice.actions;
	const [currentIteration, setCurrentIteration] = useState(0);
	const [isPlay, setIsPlay] = useState(false);
	const [isSetSecondPart, setIsSecondPart] = useState(false);
	const [speed, setSpeed] = useState(2);
	const [time, setTime] = useState(0);
	const isSecondPart = currentIteration > gameLength / 2;
	const isOverMatch = currentIteration > gameLength;

	// get full info about teams
	const urlHosts = `/real-team/${hosts._id}`;
	const urlGuests = `/real-team/${guests._id}`;
	const cacheTime = 3600000 * 24 * 7; // 1 week
	const hostsFullData = useSWR<IRealTeamFullInfo>(urlHosts, () =>
		SWRFetcher(urlHosts, cacheTime)
	);
	const guestsFullData = useSWR<IRealTeamFullInfo>(urlGuests, () =>
		SWRFetcher(urlGuests, cacheTime)
	);

	// football field
	const speedRef = useRef<any>();

	// options viewable on data on football field
	const [optionsMatch, setOptionsMatch] = useState({
		isShowNumber: true,
		isShowName: true,
		isShowFitness: true,
		isShowCoordinates: false,
		isShowChanged: true
	});

	/**
	 * @info
	 * init setup match
	 */
	useEffect(() => {
		if (
			!matchDetails &&
			hostsFullData.data?.main &&
			!hostsFullData.isLoading &&
			guestsFullData.data?.main &&
			!guestsFullData.isLoading
		) {
			// convert data of 2 team in valid data for engine
			const hostPlayers = parsePlayersHelper(hostsFullData.data.main);
			const guestsPlayers = parsePlayersHelper(guestsFullData.data.main);

			const hostsTeam = {
				teamID: hosts._id,
				logoClub: hosts.logoClub,
				name: hosts.clubName,
				manager: hosts.clubName,
				players: hostPlayers
			};

			const guestTeam = {
				teamID: guests._id,
				logoClub: guests.logoClub,
				name: guests.clubName,
				manager: guests.clubName,
				players: guestsPlayers
			};

			// it is helping for fix TypeError: Cannot delete property '1' of [object Array]
			const hostTeamDeepClone = JSON.parse(JSON.stringify(hostsTeam));
			const guestTeamDeepClone = JSON.parse(JSON.stringify(guestTeam));

			/**
			 * @info
			 * pitch standard 105x68
			 * https://footballwhispers.com/ru/blog/futbolnoe-pole-razmer-razmery-igroki/
			 */
			initiateGame(guestTeamDeepClone, hostTeamDeepClone, pitchSize).then(
				(matchDetails: IMatchDetails) => {
					/**
					 * @info
					 * sometimes appears a bug where both team are on the same side
					 */
					if (
						matchDetails.secondTeam.players[0].currentPOS[1] <
						pitchSize.pitchWidth / 2
					) {
						initiateGame(guestTeamDeepClone, hostTeamDeepClone, pitchSize).then(
							(matchDetails: IMatchDetails) =>
								dispatch(setMatchDetails(matchDetails))
						);
						return;
					}

					setCurrentIteration(0);
					setTime(0);
					dispatch(setMatchDetails(matchDetails));
				}
			);
		}
	}, [
		hostsFullData.data?.main,
		guestsFullData.data?.main,
		hostsFullData.isLoading
	]);

	// when user close tab pr leave from this page, reset all data of this match
	useEffect(() => {
		return () => {
			dispatch(reset());
		};
	}, []);

	// handler playing iteration
	const play = useCallback(() => {
		// because matchDetails from redux isn't editable
		const matchDetailsEditable = JSON.parse(JSON.stringify(matchDetails));

		for (let i = 0; i < speed; i++) {
			playIteration(matchDetailsEditable)
				.then(function (matchDetails: IMatchDetails) {
					setCurrentIteration((i: number) => ++i);
					// 90 minutes is equel 5400 seconds
					setTime((t: number) => t + timeForOneIteration);
					dispatch(setMatchDetails(matchDetails));
				})
				.catch(function (error: any) {
					console.error('Error: ', error);
				});
		}
	}, [
		matchDetails,
		setMatchDetails,
		speed,
		guestsFullData.data,
		hostsFullData.data
	]);

	// hendler click on the plat/pause
	const handlerPlayback = () => {
		if (isOverMatch) return;
		if (isPlay) {
			setIsPlay(false);
			clearInterval(speedRef.current);
			return;
		}

		setIsPlay(true);
	};

	/**
	 * @info
	 * speed
	 * handler control of speed game
	 */
	useEffect(() => {
		speedRef.current = setInterval(function () {
			if (isSecondPart && !isSetSecondPart) {
				// because matchDetails from redux isn't editable
				const matchDetailsEditable = JSON.parse(JSON.stringify(matchDetails));
				startSecondHalf(matchDetailsEditable)
					.then(function (newMatchDetails: IMatchDetails) {
						dispatch(setMatchDetails(newMatchDetails));
						setCurrentIteration((i: number) => ++i);
						setIsSecondPart(true);
					})
					.catch(function (error: any) {
						console.error('Error: ', error);
					});
				return;
			}

			if (isPlay && !isOverMatch) {
				play();
				return;
			} else if (isOverMatch) {
				setIsPlay(false);
				clearInterval(speedRef.current);
				return;
			}
		}, 30);

		return () => {
			clearInterval(speedRef.current);
		};
	}, [
		currentIteration,
		isOverMatch,
		isPlay,
		play,
		matchDetails,
		speed,
		isSecondPart
	]);

	const speedDown = () => {
		const minSpeed = 1;
		if (speed - 1 < minSpeed || isOverMatch) return;
		setSpeed((s: number) => s - 1);
	};

	const speedUp = () => {
		const maxSpeed = 8;
		if (speed + 1 > maxSpeed || isOverMatch) return;
		setSpeed((s: number) => s + 1);
	};

	const optionsMatchHandler = useCallback((options: IOptionsMatch) => {
		setOptionsMatch(options);
	}, []);

	return {
		speed,
		isPlay,
		currentIteration,
		matchDetails,
		handlerPlayback,
		time,
		speedDown,
		speedUp,
		isOverMatch,
		optionsMatch,
		optionsMatchHandler
	};
}
