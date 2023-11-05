import cn from 'classnames';
import { ICardProps } from './Card.types';
import styles from './Card.module.scss';

export const Card = ({
	className,
	children,
	...props
}: ICardProps): JSX.Element => {
	return (
		<div className={cn(styles.card, className)} {...props}>
			{children}
		</div>
	);
};
