export const parseTime = (time: number) => {
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
