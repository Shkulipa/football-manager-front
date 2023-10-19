// server
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const AXIOS_TIMEOUT = 1000 * 30;

export const defaultIconSize = 24;

export const limitReplacements = 3;

/**
 * @info
 * revalidate for fetching of requests from nextjs in server components
 * (in seconds)
 */
export const revalidate = 10;

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
