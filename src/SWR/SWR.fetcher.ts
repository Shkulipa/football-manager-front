import { apiPublic } from '@/api/instance';

type TStorageData = [string, any, number];

const week = 3600000 * 24 * 7;

export const SWRFetcher = async (url: string, maxAge = week) => {
	const cachedData = localStorage.getItem('app-cache');

	const parsedData = (await JSON.parse(cachedData || `[]`)) as TStorageData[];

	// check cached data
	const data = parsedData.find(([key]: TStorageData) => key === url);
	if (data) {
		const cacheAge = data[2]; // date when it was cached
		const cachedData = data[1];
		const now = Date.now();

		if (now - cacheAge < maxAge) {
			const parsedCachedData = await JSON.parse(cachedData);
			return parsedCachedData;
		}
	}

	const response = await apiPublic.get(url);
	const responseData = response.data;
	const timestamp = Date.now();

	parsedData.push([url, JSON.stringify(responseData), timestamp]);
	localStorage.setItem('app-cache', JSON.stringify(parsedData));

	return responseData;
};
