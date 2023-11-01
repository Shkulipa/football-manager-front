import cn from 'classnames';
import { ICardFormProps } from './CardForm.types';
import styles from './CardForm.module.scss';

export const CardForm = ({
	children,
	className,
	...props
}: ICardFormProps): JSX.Element => {
	return (
		<form
			className={cn(styles.cardForm, className)}
			autoComplete="off"
			{...props}
		>
			{children}
		</form>
	);
};
