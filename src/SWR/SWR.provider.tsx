'use client';

import { PropsWithChildren } from 'react';
import { SWRConfig } from 'swr';

interface ISWRProviderProps extends PropsWithChildren {}

/**
 * @info
 * docs: https://swr.vercel.app/ru/docs/advanced/cache
 * using it for: import { useSWRConfig } from 'swr'
 * where we can get acces by hook to data
 */
function localStorageProvider() {
	const map = new Map();
	const data = JSON.parse(localStorage.getItem('app-cache') || '[]');
	for (const [key, val] of data) map.set(key, val);
	return map;
}

export default function SWRProvider({
	children
}: ISWRProviderProps): JSX.Element {
	return (
		<SWRConfig value={{ provider: localStorageProvider }}>{children}</SWRConfig>
	);
}
