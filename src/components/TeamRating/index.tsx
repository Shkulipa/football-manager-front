import { ITeamRatingProps } from './TeamRating.types';
import styles from './TeamRating.module.scss';
import { RatingStars } from '@/components';
import Skill from './Skill';

export function TeamRating({ skills }: ITeamRatingProps): JSX.Element {
	const values = Object.values(skills);
	const rating = values.reduce((s, i) => s + i, 0) / values.length / 20;

	return (
		<div className={styles.teamRatingContainer}>
			<RatingStars rating={rating} />

			<div className={styles.skills}>
				<Skill name={'att'} value={skills.att} />
				<Skill name={'mid'} value={skills.mid} />
				<Skill name={'def'} value={skills.def} />
			</div>
		</div>
	);
}
