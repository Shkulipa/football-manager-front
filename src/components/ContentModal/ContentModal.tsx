import cn from 'classnames';
import { IContentModalProps } from './ContentModal.types';
import { Card, ModalWrapper } from '..';
import styles from './ContentModal.module.scss';

/**
 * @info
 * using on content as modal, where from the left is a sidebar
 */
export const ContentModal = ({
	children,
	className,
	...props
}: IContentModalProps): JSX.Element => {
	return (
		<ModalWrapper>
			<Card className={cn(styles.contentModalCard, className)} {...props}>
				{children}
			</Card>
		</ModalWrapper>
	);
};
