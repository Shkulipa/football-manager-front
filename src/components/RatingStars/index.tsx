import { StarHalfFilled, StarFilled, StarOutline } from '@/icons';
import { IRatingStarsProps } from './RatingStars.interfaces';
import styles from './RatingStars.module.scss';

export function RatingStars({ rating }: IRatingStarsProps) {
	const ratingStar = Array.from({ length: 5 }, (_, index) => {
		const number = index + 0.5;

		const isHalfOrEmpty =
			rating >= number ? (
				<StarHalfFilled width={25} height={25} fill={'orange'} />
			) : (
				<StarOutline width={25} height={25} fill={'orange'} />
			);

		const isFilled =
			rating >= index + 1 ? (
				<StarFilled width={25} height={25} fill={'orange'} />
			) : (
				isHalfOrEmpty
			);

		return <span key={index}>{isFilled}</span>;
	});

	return <div className={styles.ratingWrapper}>{ratingStar}</div>;
}
