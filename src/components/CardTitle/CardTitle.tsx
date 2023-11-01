import cn from 'classnames';
import styles from './CardTitle.module.scss';
import { ICardTitleProps } from './CardTitle.types';
import { Htag } from '@/components';

export const CardTitle = ({
	text,
	className,
	...props
}: ICardTitleProps): JSX.Element => {
	return (
		<Htag tag="h3" className={cn(styles.title, className)} {...props}>
			{text}
		</Htag>
	);
};
