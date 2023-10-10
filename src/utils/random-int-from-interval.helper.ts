export function randomIntFromInterval(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}
