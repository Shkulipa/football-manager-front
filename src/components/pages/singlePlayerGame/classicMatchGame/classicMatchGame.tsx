import async from 'async-es';
import cn from 'classnames';
import {
	initiateGame,
	playIteration,
	startSecondHalf
} from 'footballsimulationengine';
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from 'react';
import team1 from 'src/assets/data/match/team1.json';
import team2 from 'src/assets/data/match/team2.json';
import { ReactComponent as Forward } from 'src/assets/icons/media/forward.svg';
import { ReactComponent as Pause } from 'src/assets/icons/media/pause.svg';
import { ReactComponent as Play } from 'src/assets/icons/media/play.svg';
import { ArrowBack, ButtonIcon, PrimaryLayout, Tab } from 'src/components';
import { useWindowDimensions } from 'src/hooks';

import styles from './classicMatchGame.module.scss';

const gameLength = 14000;
const timeForOneIteration = 5400 / gameLength;

const radiusItems = 16;

const pitchJSON = {
	pitchWidth: 650,
	pitchHeight: 1050,
	goalWidth: 90
};

const parseTime = (time: number) => {
	// time is in seconds
	const minutes = time / 60;
	const wholeMinutes = Math.trunc(minutes);
	const wholeSeconds = ((((minutes - Math.trunc(minutes)) * 60) / 100) * 100)
		.toFixed(2)
		.split('.')[0];

	const textMinutes = wholeMinutes < 10 ? `0${wholeMinutes}` : wholeMinutes;
	const textSeconds =
		Number(wholeSeconds) < 10 ? `0${wholeSeconds}` : wholeSeconds;

	return `${textMinutes}:${textSeconds}`;
};

const vizualizationIteration = (canvas: HTMLCanvasElement, result: any) => {
	const ctx = canvas.getContext('2d')!;
	ctx.canvas.width = result[0];
	ctx.canvas.height = result[1];

	const positionsPlayers = [...result.slice(2, result.length - 3)];
	const playersAll = [...team1.players, ...team2.players];

	/**
	 * @info
	 * border for fill in 82 line
	 */
	for (let i = 0; i < positionsPlayers.length - 1; i++) {
		ctx.beginPath();
		ctx.moveTo(result[i], result[i + 1]);

		ctx.arc(
			positionsPlayers[i],
			positionsPlayers[i + 1],
			radiusItems + 1.5,
			0,
			2 * Math.PI
		);
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.closePath();

		i++;
	}

	/**
	 * @info
	 * fill
	 */
	for (let i = 0; i < positionsPlayers.length - 1; i++) {
		ctx.beginPath();
		ctx.moveTo(positionsPlayers[i], positionsPlayers[i + 1]);

		ctx.arc(
			positionsPlayers[i],
			positionsPlayers[i + 1],
			radiusItems,
			0,
			2 * Math.PI
		);

		if (i < positionsPlayers.length / 2) {
			ctx.fillStyle = 'red';
		} else {
			ctx.fillStyle = 'blue';
		}
		ctx.fill();
		ctx.closePath();

		i++;
	}

	/**
	 * @info
	 * ball
	 */
	const ballPosition = result.slice(result.length - 3, result.length - 1);
	ctx.beginPath();
	ctx.fillStyle = 'lime';
	ctx.arc(ballPosition[0], ballPosition[1], radiusItems * 0.7, 0, 2 * Math.PI);
	ctx.fill();
	ctx.closePath();

	/**
	 * @info
	 * number of players
	 */
	for (let i = 0; i < positionsPlayers.length - 1; i++) {
		ctx.font = '26px minako';
		ctx.fillStyle = 'white';

		if (i % 2 === 0) {
			ctx.save();
			ctx.moveTo(result[i], result[i + 1]);

			ctx.translate(
				positionsPlayers[i] + radiusItems / 2,
				positionsPlayers[i + 1]
			);
			ctx.rotate(-Math.PI / 2);
			ctx.textAlign = 'center';

			// check position
			const position = `${positionsPlayers[i]} | ${positionsPlayers[i + 1]}`;
			ctx.fillText(position, 0, -40);

			ctx.fillText(String(playersAll[i / 2].number), 0, 0);
			ctx.restore();
		}
	}
};

function processPositions(A: any, B: any, C: any) {
	return new Promise(function (resolve, reject) {
		const sendArray: any[] = [];
		sendArray.push(C.pitchSize[0]);
		sendArray.push(C.pitchSize[1]);
		async.eachSeries(
			A.players,
			function eachPlayer(thisPlayerA: any, thisPlayerACallback: any) {
				sendArray.push(thisPlayerA.currentPOS[0]);
				sendArray.push(thisPlayerA.currentPOS[1]);
				thisPlayerACallback();
			},
			function afterAllAPlayers() {
				async.eachSeries(
					B.players,
					function eachPlayer(thisPlayerB: any, thisPlayerBCallback: any) {
						sendArray.push(thisPlayerB.currentPOS[0]);
						sendArray.push(thisPlayerB.currentPOS[1]);
						thisPlayerBCallback();
					},
					function afterAllBPlayers() {
						sendArray.push(C.ball.position[0]);
						sendArray.push(C.ball.position[1]);
						sendArray.push(C);
						resolve(sendArray);
					}
				);
			}
		);
	});
}

enum ETabsMenuClassicMatch {
	MATCH = 'MATCH',
	STATISTIC = 'STATISTIC',
	TEAMS = 'TEAMS',
	TACTICKS = 'TACTICKS'
}

export function ClassicMatchGame() {
	const { width } = useWindowDimensions();
	const [tab, setTab] = useState<ETabsMenuClassicMatch>(
		ETabsMenuClassicMatch.MATCH
	);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [matchDetails, setMatchDetails] = useState<any>();
	const [matchInfo, setMatchInfo] = useState<any>();
	const [currentIteration, setCurrentIteration] = useState(0);
	const [isPlay, setIsPlay] = useState(false);

	// x - multiplier
	const [speed, setSpeed] = useState(2);
	const [time, setTime] = useState(0);
	const speedRef = useRef<any>();

	const isOverMatch = currentIteration > gameLength;

	/**
	 * @info
	 * init
	 */
	useLayoutEffect(() => {
		/**
		 * @info
		 * pitch standart 105x68
		 * https://footballwhispers.com/ru/blog/futbolnoe-pole-razmer-razmery-igroki/
		 */
		initiateGame(team1, team2, pitchJSON).then((matchSetup: any) => {
			processPositions(
				matchSetup.kickOffTeam,
				matchSetup.secondTeam,
				matchSetup
			)
				.then(function (matchDetails) {
					setMatchDetails(matchDetails);
				})
				.catch(function (error) {
					console.error('Eror when processing positions: ', error);
				});
		});
	}, []);

	const play = useCallback(
		() =>
			playIteration(matchInfo)
				.then(function (matchSetup: { kickOffTeam: any; secondTeam: any }) {
					processPositions(
						matchSetup.kickOffTeam,
						matchSetup.secondTeam,
						matchSetup
					)
						.then(function (matchDetails) {
							setCurrentIteration((i: number) => ++i);
							// 90 minutes is equel 5400 seconds
							setTime((t: number) => t + timeForOneIteration);
							setMatchDetails(matchDetails);
						})
						.catch(function (error) {
							console.error('Eror when processing positions: ', error);
						});
				})
				.catch(function (error: any) {
					console.error('Error: ', error);
				}),
		[matchInfo]
	);

	/**
	 * @info
	 * play the match after init
	 */
	useEffect(() => {
		if (matchDetails && canvasRef.current) {
			vizualizationIteration(canvasRef.current, matchDetails);
			setMatchInfo(matchDetails[matchDetails.length - 1]);
			// setIsPlay(true);
		}
	}, [matchDetails, canvasRef, tab]);

	/**
	 * @info
	 * speed
	 */
	useEffect(() => {
		speedRef.current = setInterval(function () {
			const isHalfTime = currentIteration === gameLength / 2;

			if (isPlay && !isOverMatch && !isHalfTime) {
				play();
			} else if (isHalfTime) {
				startSecondHalf(matchInfo)
					.then(function (matchDetails: any) {
						setMatchInfo(matchDetails);
						play();
					})
					.catch(function (error: any) {
						console.error('Error: ', error);
					});
			} else if (isOverMatch) {
				setIsPlay(false);
				clearInterval(speedRef.current);
			}
		}, 40 / speed);

		return () => {
			clearInterval(speedRef.current);
		};
	}, [currentIteration, isOverMatch, isPlay, matchInfo, play, speed]);

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
	const ratioPitch = pitchJSON.pitchWidth / pitchJSON.pitchHeight;
	const sizeCanvas = widthCanvas * ratioPitch;

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
				</div>

				{/* match tab */}
				{tab === ETabsMenuClassicMatch.MATCH && (
					<div className={styles.matchTabContent}>
						<div
							className={styles.contentWrapper}
							style={{ width: widthCanvas }}
						>
							{matchInfo && (
								<div className={styles.teamsNames}>
									{matchInfo.secondTeam.name}{' '}
									{matchInfo.secondTeamStatistics.goals}
								</div>
							)}
							<span>:</span>
							{matchInfo && (
								<div className={styles.teamsNames}>
									{matchInfo.kickOffTeamStatistics.goals}{' '}
									{matchInfo.kickOffTeam.name}
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
							style={{ width: widthCanvas, height: sizeCanvas }}
						>
							<canvas
								className={styles.stadium}
								ref={canvasRef}
								style={{ maxWidth: sizeCanvas }}
							/>
						</div>
					</div>
				)}
			</PrimaryLayout>
		</div>
	);
}
