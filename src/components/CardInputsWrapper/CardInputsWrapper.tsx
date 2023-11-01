import cn from 'classnames';
import { ICardInputsWrapperProps } from './CardInputsWrapper.types';
import styles from './CardInputsWrapper.module.scss';

export const CardInputsWrapper = ({
	children,
	className,
	...props
}: ICardInputsWrapperProps): JSX.Element => {
	return (
		<div className={cn(styles.cardInputsWrapper, className)} {...props}>
			{children}
		</div>
	);
};
