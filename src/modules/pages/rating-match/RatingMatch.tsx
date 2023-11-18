'use client';

import { apiAuth } from '@/api/rest/auth/apiAuth';
import { IServerError } from '@/api/rest/types/server-error';
import { showGlobalError } from '@/components/GlobalModal/store';
import { SERVER_URL } from '@/constants';
import { EKeyLocalStorage } from '@/constants/keys-local-storage';
import { logout, setUser } from '@/layouts/AuthLayout/store/user';
import { handleWsActionErrors } from '@/utils/handle-ws-actions-errors';
import { isAxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { EStatusMatch, IJoinDetails } from './types/match-detail';
import styles from './RatingMatch.module.scss';
import { ErrorNotification, Loader, Ptag } from '@/components';
import { IMatchSimulationData } from './types/match-simulation';
import { IMatchDetails } from 'footballsimulationengine';
import { Game } from './modules/Game';
import { MatchResult } from './modules/MatchResult';
import { ratingMatchSlice } from './store/rating-match';

export const RatingMatch = () => {
	const params = useParams();
	const socket = useRef<Socket | null>(null);

	const dispatch = useAppDispatch();
	const { user } = useAppSelector(s => s.userReducer);
	const { setMatchDetails, setInitUserTeam } = ratingMatchSlice.actions;
	const [error, setError] = useState<string | null>(null);

	const [joinDetail, setJoinDetail] = useState<IJoinDetails | null>();
	const [statusMatch, setSetStatusMatch] = useState<
		IJoinDetails['status'] | null
	>();

	const currIteration = useRef(0);
	const [gameLength, setGameLength] = useState<number | null>();
	const intervalSimulationMatch = useRef<ReturnType<typeof setInterval>>();
	const iterationsSimulations = useRef<IMatchDetails[]>([]);

	// main value on BE
	const [matchIteration, setMatchIteration] = useState(0);

	const { reset } = ratingMatchSlice.actions;

	useEffect(() => {
		/**
		 * @info
		 * run only once
		 */
		if (
			statusMatch === EStatusMatch.IN_PROCESS &&
			iterationsSimulations.current.length > 0 &&
			gameLength &&
			currIteration.current === 0
		) {
			intervalSimulationMatch.current = setInterval(() => {
				// if it is not last iteration in arr of iterations
				if (iterationsSimulations.current.length !== currIteration.current) {
					const newMatchDetails =
						iterationsSimulations.current[currIteration.current];

					dispatch(setMatchDetails(newMatchDetails));

					const team =
						user?.username === newMatchDetails.secondTeam.manager
							? newMatchDetails.secondTeam
							: newMatchDetails.kickOffTeam;
					dispatch(setInitUserTeam(team));

					/**
					 * @info
					 * matchIteration - curr iteration in match on server(BE) side
					 * currIteration - curr iteration in match on client side,
					 *
					 * because we get iterations in array from BE, for make less requests to client from BE
					 * when BE this.io.emit(roomMatch).emit('key', data) to client
					 */
					++currIteration.current;
					return;
				}
			}, 20);
		}
	}, [
		statusMatch,
		iterationsSimulations.current.length,
		gameLength,
		currIteration.current
	]);

	useEffect(() => {
		const connectSockets = async () => {
			if (SERVER_URL) {
				/**
				 * @info
				 * refresh 2 tokens for user for while searching opponent
				 * anyway he will get link to match, even tokens was expired, then
				 * we update them again before the match
				 *
				 * @note
				 * tokens for football match should be longer then the match full time
				 */
				try {
					const { data } = await apiAuth.refreshToken();
					const userJSON = JSON.stringify(data);
					localStorage.setItem(EKeyLocalStorage.USER, userJSON);
					dispatch(setUser(data));
				} catch (err) {
					if (isAxiosError(err) && err.response) {
						dispatch(showGlobalError(err.response.data));
					}
					dispatch(logout());
				}

				// connect to socket
				const socketClient = io(`${SERVER_URL}/match`, {
					auth: {
						token: user?.accessToken || ''
					},
					transports: ['websocket', 'polling']
				});
				socket.current = socketClient;

				socket.current.on('connect', () => {
					if (socket.current)
						socket.current?.emit('join', { matchId: params.id });
				});

				/**
				 * @info
				 * error before connecting
				 */
				socket.current.on('connect_error', data => {
					console.error('connect_error', data);
					socket.current?.close();
					handleWsActionErrors({
						e: data,
						dispatch
					});
				});

				/**
				 * @info
				 * listener of match-simulation
				 */
				socket.current.on('match-simulation', (data: string) => {
					const parsedData = JSON.parse(data) as IMatchSimulationData;

					// set length of match
					if (!gameLength) setGameLength(parsedData.gameLength);

					// set match time from BE
					setMatchIteration(parsedData.currIteration);

					// set iterations
					iterationsSimulations.current = [
						...iterationsSimulations.current,
						...parsedData.simulations
					];

					if (statusMatch !== EStatusMatch.IN_PROCESS)
						setSetStatusMatch(EStatusMatch.IN_PROCESS);
				});

				/**
				 * @info
				 * listener of match-simulation
				 */
				socket.current.on('match-result', (data: IJoinDetails) => {
					setSetStatusMatch(EStatusMatch.FINISHED);
					setJoinDetail(data);
					setTimeout(() => {
						socket.current?.close();
					}, 2500);
					return;
				});

				/**
				 * @info
				 * listener of join
				 */
				socket.current.on('join', (data: IJoinDetails) => {
					// check on the finishing game
					if (
						data.status === EStatusMatch.FINISHED &&
						data.reward &&
						data.statistics
					) {
						setJoinDetail(data);
						setSetStatusMatch(EStatusMatch.FINISHED);
						return;
					}

					if (data.status === EStatusMatch.IN_PROCESS) {
						setSetStatusMatch(EStatusMatch.IN_PROCESS);
					}

					// handler about starting match
					const isBothPlayersReady =
						data.player1.isReady && data.player2.isReady;
					const isFirstPlayer = data.player1.user._id === user?._id; // only 1 player have to start the match
					if (data.status === EStatusMatch.PREPARE && isBothPlayersReady) {
						if (isFirstPlayer)
							socket.current?.emit('start-match', { matchId: params.id });
					}

					setJoinDetail(data);
				});

				/**
				 * @info
				 * errors after connecting to ws
				 */
				socket.current.on('exception', (data: string) => {
					console.error('exception', data);
					const err = JSON.parse(data) as IServerError;
					setError(err.message);

					setTimeout(() => {
						setError('');
					}, 15000);
				});
			}
		};

		connectSockets();

		return () => {
			socket.current?.close();
			socket.current = null;
			clearInterval(intervalSimulationMatch.current);
			dispatch(reset());
		};
	}, []);

	if (error)
		return (
			<div className={styles.ratingMatchWrapper}>
				<ErrorNotification message={error} />
			</div>
		);

	switch (statusMatch) {
		case EStatusMatch.PREPARE:
			return (
				<div className={styles.ratingMatchWrapper}>
					<div className={styles.cardPrepareMatch}>
						<Ptag>Please wait, when all player will join to match</Ptag>
						<div className={styles.playerReadyWrapper}>
							<Ptag>
								{joinDetail?.player1.user.username}:{' '}
								{joinDetail?.player1.isReady ? 'Ready' : 'Not Ready'}
							</Ptag>
							<Ptag>
								{joinDetail?.player2.user.username}:{' '}
								{joinDetail?.player2.isReady ? 'Ready' : 'Not Ready'}
							</Ptag>
						</div>
					</div>
				</div>
			);
		case EStatusMatch.IN_PROCESS:
			return (
				<Game
					sockets={socket.current!}
					matchIteration={matchIteration}
					gameLength={gameLength || 0}
				/>
			);
		case EStatusMatch.FINISHED:
			return (
				<div className={styles.ratingMatchWrapper}>
					<MatchResult matchResult={joinDetail} />
				</div>
			);
		default:
			return (
				<div className={styles.ratingMatchWrapper}>
					<Loader />
				</div>
			);
	}
};
