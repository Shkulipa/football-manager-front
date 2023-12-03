import cn from 'classnames';
import { ICardFormContentProps } from './CardFormContent.types';
import styles from './CardFormContent.module.scss';
import { Card, CardTitle } from '..';
import { CardForm } from '../CardForm';
import { CardInputsWrapper } from '../CardInputsWrapper';

/**
 * Card with form * inputs
 */
export const CardFormContent = ({
	title,
	error,
	children,
	buttons,
	className,
	formProps,
	...props
}: ICardFormContentProps): JSX.Element => {
	return (
		<Card className={cn(styles.card, className)} {...props}>
			<CardTitle text={title} />

			{error}

			<CardForm {...formProps}>
				<CardInputsWrapper>{children}</CardInputsWrapper>
				<div className={styles.buttonsWrapper}>{buttons.map(b => b)}</div>
			</CardForm>
		</Card>
	);
};
