import cn from 'classnames';
import {
	initiateGame,
	playIteration,
	startSecondHalf
} from 'footballsimulationengine';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactComponent as Forward } from 'src/assets/icons/media/forward.svg';
import { ReactComponent as Pause } from 'src/assets/icons/media/pause.svg';
import { ReactComponent as Play } from 'src/assets/icons/media/play.svg';
import {
	ArrowBack,
	ButtonIcon,
	Options,
	PrimaryLayout,
	StatisticMatch,
	Tab,
	Tactics,
	TeamsMatch
} from 'src/components';
import { useAppDispatch, useAppSelector, useWindowDimensions } from 'src/hooks';
import { IOptionsMatch } from 'src/interfaces';
import { matchSlice } from 'src/store/slices';
import { parseTime, vizualizationIteration } from 'src/utils';
import { gameLength, timeForOneIteration } from 'src/utils/consts';

import { ETabsMenuClassicMatch } from './classicMatchGame.interfaces';
import styles from './classicMatchGame.module.scss';

export function ClassicMatchGame() {
	const { pitchSize, hosts, guests, matchDetails } = useAppSelector(
		s => s.match
	);
	const dispatch = useAppDispatch();
	const { setMatchDetails } = matchSlice.actions;

	const { width } = useWindowDimensions();
	const [tab, setTab] = useState<ETabsMenuClassicMatch>(
		ETabsMenuClassicMatch.MATCH
	);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [currentIteration, setCurrentIteration] = useState(0);
	const [isPlay, setIsPlay] = useState(false);

	// x - multiplier
	const [speed, setSpeed] = useState(2);
	const [time, setTime] = useState(0);
	const speedRef = useRef<any>();

	// options
	const [optionsMatch, setOptionsMatch] = useState<IOptionsMatch>({
		isShowNumber: true,
		isShowName: true,
		isShowFitness: true,
		isShowCoordinates: false,
		isShowChanged: true
	});

	const isOverMatch = currentIteration > gameLength;

	/**
	 * @info
	 * init
	 */
	useEffect(() => {
		const hostsPlayers = hosts.players
			.filter(p => p.role === 'main')
			.map(p => ({
				name: p.name,
				number: p.number,
				position: p.position,
				startCoordinates: p.position,
				rating: p.rating,
				skill: p.skill,
				currentPOS: [p.currentPOS[0], p.currentPOS[1]],
				fitness: p.fitness,
				injured: p.skill
			}))
			.sort(function (a, b) {
				const order = ['GK', 'LB', 'CB', 'RB', 'LM', 'CM', 'RM', 'ST'];
				return order.indexOf(a.position) - order.indexOf(b.position);
			});
		const hostsTeam = {
			name: hosts.name,
			manager: 'Aiden 2',
			players: [
				{ ...hostsPlayers[0] },
				{ ...hostsPlayers[1] },
				{ ...hostsPlayers[2] },
				{ ...hostsPlayers[3] },
				{ ...hostsPlayers[4] },
				{ ...hostsPlayers[5] },
				{ ...hostsPlayers[6] },
				{ ...hostsPlayers[7] },
				{ ...hostsPlayers[8] },
				{ ...hostsPlayers[9] },
				{ ...hostsPlayers[10] }
			]
		};

		const guestPlayers = guests.players
			.filter(p => p.role === 'main')
			.map(p => ({
				name: p.name,
				number: p.number,
				position: p.position,
				rating: p.rating,
				skill: p.skill,
				currentPOS: [p.currentPOS[0], p.currentPOS[1]],
				fitness: p.fitness,
				injured: p.skill
			}))
			.sort(function (a, b) {
				const order = ['GK', 'LB', 'CB', 'RB', 'LM', 'CM', 'RM', 'ST'];
				return order.indexOf(a.position) - order.indexOf(b.position);
			});

		const guestTeam = {
			name: guests.name,
			manager: 'Aiden 2',
			players: guestPlayers
		};

		/**
		 * @info
		 * pitch standart 105x68
		 * https://footballwhispers.com/ru/blog/futbolnoe-pole-razmer-razmery-igroki/
		 */
		initiateGame(guestTeam, hostsTeam, pitchSize).then((matchDetails: any) => {
			/**
			 * @info
			 * sometimes appears a bug wehre both team are on the same side
			 */
			if (
				matchDetails.secondTeam.players[0].currentPOS[1] <
				pitchSize.pitchWidth / 2
			) {
				initiateGame(guestTeam, hostsTeam, pitchSize).then(
					(matchDetails: any) => dispatch(setMatchDetails(matchDetails))
				);
				return;
			}

			setCurrentIteration(0);
			setTime(0);
			dispatch(setMatchDetails(matchDetails));
		});

		return () => {
			dispatch(setMatchDetails(null));
			setCurrentIteration(0);
			setTime(0);
		};
	}, []);

	const play = useCallback(() => {
		// because matchDetails from redux isn't editable
		const matchDetailsEditable = JSON.parse(JSON.stringify(matchDetails));

		playIteration(matchDetailsEditable)
			.then(function (matchDetails: any) {
				setCurrentIteration((i: number) => ++i);
				// 90 minutes is equel 5400 seconds
				setTime((t: number) => t + timeForOneIteration);
				dispatch(setMatchDetails(matchDetails));
			})
			.catch(function (error: any) {
				console.error('Error: ', error);
			});
	}, [matchDetails]);

	/**
	 * @info
	 * the match after init
	 */
	useEffect(() => {
		if (matchDetails && canvasRef.current) {
			vizualizationIteration(canvasRef.current, matchDetails, optionsMatch);
			// setIsPlay(true);
		}
	}, [matchDetails, currentIteration, canvasRef, tab, optionsMatch]);

	/**
	 * @info
	 * speed
	 */
	useEffect(() => {
		const isHalfTime = currentIteration === gameLength / 2;

		speedRef.current = setInterval(function () {
			if (isPlay && !isOverMatch && !isHalfTime) {
				play();
				return;
			} else if (isHalfTime) {
				/**
				 * @Todo
				 * 1. create custom second half function
				 * 2. reset all position for all players
				 * 3. make correct position for players
				 * 4. ball position reset
				 * 5. save fitness
				 */

				// because matchDetails from redux isn't editable
				const matchDetailsEditable = JSON.parse(JSON.stringify(matchDetails));
				startSecondHalf(matchDetailsEditable)
					.then(function (newMatchDetails: any) {
						dispatch(setMatchDetails(newMatchDetails));
						setCurrentIteration((i: number) => ++i);
					})
					.catch(function (error: any) {
						console.error('Error: ', error);
					});
				return;
			} else if (isOverMatch) {
				setIsPlay(false);
				clearInterval(speedRef.current);
				return;
			}
		}, 40 / speed);

		return () => {
			clearInterval(speedRef.current);
		};
	}, [currentIteration, isOverMatch, isPlay, play, matchDetails, speed]);

	const handlerPlayback = () => {
		if (isOverMatch) return;
		if (isPlay) {
			setIsPlay(false);
			clearInterval(speedRef.current);
			return;
		}

		setIsPlay(true);
	};

	const speedDown = () => {
		if (speed === 1 || isOverMatch) return;
		setSpeed((s: number) => s / 2);
	};

	const speedUp = () => {
		if (speed === 8 || isOverMatch) return;
		setSpeed((s: number) => s * 2);
	};

	const widthCanvas = (width * 55) / 100;
	const ratioPitch = pitchSize.pitchWidth / pitchSize.pitchHeight;
	const heightCanvas = widthCanvas * ratioPitch;

	const playbackIcon = isPlay ? (
		<Pause className={styles.playbackIcon} />
	) : (
		<Play className={styles.playbackIcon} />
	);

	const timeLineWidth = (currentIteration * 100) / gameLength;

	return (
		<div className={styles.classicMatchGame}>
			<ArrowBack to={'/classic-match'} />

			<PrimaryLayout>
				<div className={styles.navigator}>
					<Tab
						isActive={tab === ETabsMenuClassicMatch.MATCH}
						onClick={() => setTab(ETabsMenuClassicMatch.MATCH)}
					>
						Match
					</Tab>
					<Tab
						isActive={tab === ETabsMenuClassicMatch.STATISTIC}
						onClick={() => setTab(ETabsMenuClassicMatch.STATISTIC)}
					>
						Statistic
					</Tab>
					<Tab
						isActive={tab === ETabsMenuClassicMatch.TEAMS}
						onClick={() => setTab(ETabsMenuClassicMatch.TEAMS)}
					>
						Teams
					</Tab>
					<Tab
						isActive={tab === ETabsMenuClassicMatch.TACTICKS}
						onClick={() => setTab(ETabsMenuClassicMatch.TACTICKS)}
					>
						Tactics
					</Tab>
					<Tab
						isActive={tab === ETabsMenuClassicMatch.OPTIONS}
						onClick={() => setTab(ETabsMenuClassicMatch.OPTIONS)}
					>
						Options
					</Tab>
				</div>

				{/* match tab */}
				{tab === ETabsMenuClassicMatch.MATCH && (
					<div className={styles.matchTabContent}>
						<div
							className={styles.contentWrapper}
							style={{ width: widthCanvas }}
						>
							{matchDetails && (
								<div className={styles.teamsNames}>
									{matchDetails.secondTeam.name}{' '}
									{matchDetails.secondTeamStatistics.goals}
								</div>
							)}
							<span>:</span>
							{matchDetails && (
								<div className={styles.teamsNames}>
									{matchDetails.kickOffTeamStatistics.goals}{' '}
									{matchDetails.kickOffTeam.name}
								</div>
							)}
						</div>

						<div className={styles.actions} style={{ width: widthCanvas }}>
							<ButtonIcon
								onClick={handlerPlayback}
								className={styles.playbackBtn}
								disabled={isOverMatch}
							>
								{playbackIcon}
							</ButtonIcon>

							<div className={styles.speed}>
								<ButtonIcon onClick={speedDown} disabled={isOverMatch}>
									<Forward
										className={cn(styles.forwardIcon, styles.speedDown)}
									/>
								</ButtonIcon>

								<div className={styles.speedText}>x{speed}</div>

								<ButtonIcon onClick={speedUp} disabled={isOverMatch}>
									<Forward className={cn(styles.forwardIcon, styles.speedUp)} />
								</ButtonIcon>
							</div>

							<div className={styles.timeline}>
								<div className={styles.time}>
									<div className={styles.clock}>
										<div
											className={cn(styles.shortLine, {
												[styles.isAnimate]: isPlay
											})}
										/>
										<div
											className={cn(styles.longerLine, {
												[styles.isAnimate]: isPlay
											})}
										/>
									</div>
									<div className={styles.timeText}>{parseTime(time)}</div>
								</div>
								<div className={styles.line}>
									<div
										className={styles.passedLine}
										style={{ width: `${timeLineWidth}%` }}
									/>
								</div>
							</div>
						</div>

						<div
							className={styles.stadiumWrapper}
							style={{ width: widthCanvas, height: heightCanvas }}
						>
							<canvas
								className={styles.stadium}
								ref={canvasRef}
								style={{ maxWidth: heightCanvas }}
							/>
						</div>
					</div>
				)}

				{tab === ETabsMenuClassicMatch.STATISTIC && (
					<StatisticMatch matchDetails={matchDetails} />
				)}

				{tab === ETabsMenuClassicMatch.TEAMS && (
					<TeamsMatch matchDetails={matchDetails} />
				)}

				{tab === ETabsMenuClassicMatch.TACTICKS && <Tactics />}

				{tab === ETabsMenuClassicMatch.OPTIONS && (
					<Options
						optionsMatch={optionsMatch}
						setOptionsMatch={setOptionsMatch}
					/>
				)}
			</PrimaryLayout>
		</div>
	);
}
