import { IPlayerSkills } from '@/types/football-simulator/player-skills';

/**
 * result in stars
 */
export const ratingHelper = (
	skills: IPlayerSkills,
	maxRatingPlayer: number = 5
) => {
	const values = Object.values(skills);
	const sum = values.reduce((acc, curr) => acc + Number(curr), 0);
	const average = sum / values.length;
	const rating = (average * maxRatingPlayer) / 100;
	const fixedRating = Math.floor(rating);

	return +fixedRating;
};
