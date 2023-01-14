import { ReactComponent as StarFilled } from 'src/assets/icons/stars/star-filled.svg';
import { ReactComponent as StarHalfFilled } from 'src/assets/icons/stars/star-half-fullid.svg';
import { ReactComponent as StarOutline } from 'src/assets/icons/stars/star-outline.svg';

import { IRatingStarsProps } from './ratingStars.interfaces';
import styles from './ratingStars.module.scss';

export function RatingStars({ rating }: IRatingStarsProps) {
	const ratingStar = Array.from({ length: 5 }, (elem, index) => {
		const number = index + 0.5;

		const isHalfOrEmpty =
			rating >= number ? (
				<StarHalfFilled className={styles.starRating} />
			) : (
				<StarOutline className={styles.starRating} />
			);

		const isFilled =
			rating >= index + 1 ? (
				<StarFilled className={styles.starRating} />
			) : (
				isHalfOrEmpty
			);

		return <span key={index}>{isFilled}</span>;
	});

	return <div className={styles.ratingWrapper}>{ratingStar}</div>;
}
