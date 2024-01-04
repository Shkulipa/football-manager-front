import cn from 'classnames';
import { StarHalfFilled, StarFilled, StarOutline } from '@/icons';
import { IRatingStarsProps } from './RatingStars.interfaces';
import styles from './RatingStars.module.scss';

export function RatingStars({
	rating,
	className,
	size = 25
}: IRatingStarsProps) {
	const ratingStar = Array.from({ length: 5 }, (_, index) => {
		const number = index + 0.5;

		const isHalfOrEmpty =
			rating >= number ? (
				<StarHalfFilled width={size} height={size} fill={'orange'} />
			) : (
				<StarOutline width={size} height={size} fill={'orange'} />
			);

		const isFilled =
			rating >= index + 1 ? (
				<StarFilled width={size} height={size} fill={'orange'} />
			) : (
				isHalfOrEmpty
			);

		return <span key={index}>{isFilled}</span>;
	});

	return (
		<div className={cn(styles.ratingWrapper, className)}>{ratingStar}</div>
	);
}
