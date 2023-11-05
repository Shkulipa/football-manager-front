// server
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const AXIOS_TIMEOUT = 1000 * 30;

export const defaultIconSize = 24;

export const limitReplacements = 3;
export const limitBenchPlayers = 7;

/**
 * @info
 * revalidate for fetching of requests from nextjs in server components
 * (in seconds)
 * 3600 = 1 hour
 */
export const revalidate = 3600 * 24;

/**
 * @info
 * using for matches
 */
export const gameLength = 3000;
export const timeForOneIteration = 5400 / gameLength;
export const radiusItems = 18;
export const pitchSize = {
	pitchWidth: 650,
	pitchHeight: 1050,
	goalWidth: 90
};
