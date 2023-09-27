'use client';

import { SWRFetcher } from '@/SWR/SWR.fetcher';
import { useAppSelector } from '@/hooks/redux';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

export function Game(): JSX.Element {
	const state = useAppSelector(state => state.singleMatchReducer);
	const router = useRouter();

	// if teams weren't picked -> redirect to single-match page
	if (!state.hosts || !state.guests) router.push('/single-match');

	// get full info about teams
	const urlHosts = `/real-team/${state.hosts._id}`;
	const urlGuests = `/real-team/${state.guests._id}`;
	const cacheTime = 3600000 * 24 * 7; // 1 week
	const hostsFullData = useSWR(urlHosts, () => SWRFetcher(urlHosts, cacheTime));
	const guestsFullData = useSWR(urlGuests, () =>
		SWRFetcher(urlGuests, cacheTime)
	);

	return <div>{JSON.stringify(hostsFullData)}</div>;
}
