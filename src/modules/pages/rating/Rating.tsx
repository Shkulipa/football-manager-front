'use client';

import { io, Socket } from 'socket.io-client';
import { Button, ErrorNotification, Loader, Ptag } from '@/components';
import styles from './Rating.module.scss';
import { Search } from '@/icons/Search';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { logout, setUser } from '@/layouts/AuthLayout/store/user';
import { handleWsActionErrors } from '@/utils/handle-ws-actions-errors';
import { apiAuth } from '@/api/rest/auth/apiAuth';
import { EKeyLocalStorage } from '@/constants/keys-local-storage';
import { IServerError } from '@/api/rest/types/server-error';
import { SERVER_URL } from '@/constants';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes.enum';
import { IMatchInfo } from './types';
import { showGlobalError } from '@/components/GlobalModal/store';
import { isAxiosError } from 'axios';
import { apiRatingMatch } from '@/api/rest/rating-match/rating-match';
import { handleActionErrors } from '@/utils/handle-action-errors';

export const Rating = (): JSX.Element => {
	const router = useRouter();
	const socket = useRef<Socket>();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(s => s.userReducer);
	const [isSearching, setIsSearching] = useState(false);
	const [playersInPool, setPlayersInPool] = useState(0);
	const [error, setError] = useState('');
	const [disabledSearchButton, setDisabledSearchBtn] = useState(false);
	const [currMatch, setCurrMatch] = useState('');
	const [isCheckExistInMatch, setIsCheckExistInMatch] = useState(false);
	const [isShowLinkToYourTeam, setIsShowLinkToYourTeam] = useState(false);

	const onCancelSearch = () => {
		if (socket.current) {
			socket.current.disconnect();
			socket.current = undefined;
		}

		setIsSearching(false);
		setPlayersInPool(0);
	};

	/**
	 * @info
	 * unmount socket connection
	 */
	useEffect(() => {
		/**
		 * @todo
		 * check current match
		 */
		const getCurrMatch = async () => {
			try {
				const { data } = await apiRatingMatch.getCurrentLiveMatch();
				setCurrMatch(data);
				setIsCheckExistInMatch(true);
			} catch (e) {
				handleActionErrors({
					e,
					dispatch
				});
			}
		};
		getCurrMatch();

		return () => {
			onCancelSearch();
		};
	}, []);

	const onSearchOpponent = async () => {
		setDisabledSearchBtn(true);
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
			const socketClient = io(`${SERVER_URL}/search-opponent`, {
				auth: {
					token: user?.accessToken || ''
				},
				transports: ['websocket', 'polling']
			});
			socket.current = socketClient;

			socket.current.on('connect', () => {
				setIsSearching(true);
				setDisabledSearchBtn(false);
			});

			/**
			 * @info
			 * error before connecting to server
			 */
			socket.current.on('connect_error', data => {
				console.error('connect_error', data);
				handleWsActionErrors({
					e: data,
					dispatch
				});
				onCancelSearch();
			});

			/**
			 * @info
			 * players in pool in current time
			 */
			socket.current.on('players-in-poll', (count: number) => {
				setPlayersInPool(count);
			});

			/**
			 * @info
			 * here, we will get id on the match(matchId)
			 */
			socket.current.on('searched-match', (matchInfo: string) => {
				const parsedMatchInfo = JSON.parse(matchInfo) as IMatchInfo;
				router.replace(`${ROUTES.RATING_MATCH}/${parsedMatchInfo.matchId}`);
			});

			/**
			 * @info
			 * errors after connecting to server
			 */
			socket.current.on('exception', (data: string) => {
				console.error('exception', data);
				const err = JSON.parse(data) as IServerError;
				setError(err.message);

				onCancelSearch();

				/**
				 * @info
				 * show button link to team page
				 */
				if (err.statusCode === 404 || err.statusCode === 400) {
					setIsShowLinkToYourTeam(true);
				}

				setTimeout(() => {
					setError('');
					setIsShowLinkToYourTeam(false);
					setDisabledSearchBtn(false);
				}, 15000);
			});
		}

		return;
	};

	if (!isCheckExistInMatch) return <Loader />;

	const errorNotification = error && (
		<div className={styles.errorWrapper}>
			<ErrorNotification message={error} />
			{isShowLinkToYourTeam && (
				<Button onClick={() => router.push(ROUTES.USER_TEAM)}>
					Go to Your Team
				</Button>
			)}
		</div>
	);

	const searchBtn = isSearching ? (
		<Button onClick={onCancelSearch} disabled={Boolean(error)}>
			Cancel Searching...
		</Button>
	) : (
		<Button
			onClick={onSearchOpponent}
			disabled={Boolean(error) || disabledSearchButton}
		>
			Search Opponent{isSearching && '...'}
		</Button>
	);

	const textDescription = isSearching ? (
		<Ptag>Players in searching: {playersInPool}</Ptag>
	) : (
		<Ptag>
			Find a worthy opponent that matches the strength of your team according to
			the elo rating.
		</Ptag>
	);

	const searchIcon = isSearching ? (
		<div className={styles.searchAnimation}>
			<Search width={128} height={128} />
		</div>
	) : (
		<Search width={128} height={128} />
	);

	/**
	 * @info
	 * if user not playing match right now, because more then 1 match, you can't play
	 */
	const primaryContent = (
		<>
			{searchIcon}

			<div className={styles.textContentWrapper}>{textDescription}</div>

			<div className={styles.actionWrapper}>
				{searchBtn}

				{errorNotification}
			</div>
		</>
	);

	/**
	 * @info
	 * if user is being in match already
	 */
	const onJoinCurrentMatch = () =>
		currMatch && router.replace(`${ROUTES.RATING_MATCH}/${currMatch}`);
	const secondaryContent = (
		<>
			<Ptag>
				You cannot search for another opponent until you finish the current
				match.
			</Ptag>
			<Button onClick={onJoinCurrentMatch}>Join to current Match</Button>
		</>
	);

	const content = currMatch ? secondaryContent : primaryContent;

	return (
		<div className={styles.ratingWrapper}>
			<div className={styles.ratingCard}>{content}</div>
		</div>
	);
};
