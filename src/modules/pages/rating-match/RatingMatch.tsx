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
import { Game } from './modules/Game';
import { MatchResult } from './modules/MatchResult';
import { ratingMatchSlice } from './store/rating-match';

export const RatingMatch = () => {
	const params = useParams();
	const socket = useRef<Socket | null>(null);

	const dispatch = useAppDispatch();
	const { user } = useAppSelector(s => s.userReducer);
	const { cooldownUpdateSquad, initUserTeam } = useAppSelector(
		s => s.ratingMatchReducer
	);
	const { setMatchDetails, setInitUserTeam, setSecondUserTeamVersion } =
		ratingMatchSlice.actions;
	const [error, setError] = useState<string | null>(null);

	const [joinDetail, setJoinDetail] = useState<IJoinDetails | null>();
	const [statusMatch, setSetStatusMatch] = useState<
		IJoinDetails['status'] | null
	>();

	const [gameLength, setGameLength] = useState<number | null>();
	const intervalSimulationMatch = useRef<ReturnType<typeof setInterval>>();

	// main value on BE
	const [matchIteration, setMatchIteration] = useState(0);

	const { reset } = ratingMatchSlice.actions;

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
					transports: ['websocket']
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

					dispatch(setMatchDetails(parsedData.matchInfo));

					if (!initUserTeam) {
						const team =
							user?.username === parsedData.matchInfo.secondTeam.manager
								? parsedData.matchInfo.secondTeam
								: parsedData.matchInfo.kickOffTeam;

						if (team) {
							dispatch(setInitUserTeam(team));
							if (cooldownUpdateSquad) dispatch(setSecondUserTeamVersion(team));
						}
					}

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
					}, 300);
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
						setSetStatusMatch(EStatusMatch.FINISHED);
					}

					if (data.status === EStatusMatch.IN_PROCESS) {
						setSetStatusMatch(EStatusMatch.IN_PROCESS);
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
