import cn from 'classnames';
import styles from './ModalWrapper.module.scss';
import { IModalWrapperProps } from './ModalWrapper.types';

export const ModalWrapper = ({
	children,
	className,
	...props
}: IModalWrapperProps): JSX.Element => {
	return (
		<div className={cn(styles.modalWrapper, className)} {...props}>
			{children}
		</div>
	);
};
