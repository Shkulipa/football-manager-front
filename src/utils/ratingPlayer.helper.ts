import { maxRatingPlayer } from '@/constants/footballsimulationengine/common-player-values';
import { IPlayerSkills } from '@/types/primary/player-skills';

export const ratingHelper = (skills: IPlayerSkills) => {
	const values = Object.values(skills);
	const sum = values.reduce((acc, curr) => acc + Number(curr), 0);
	const average = sum / values.length;
	const rating = (average * maxRatingPlayer) / 100;
	const fixedRating = rating.toFixed(0);

	return +fixedRating;
};
