import cn from 'classnames';
import styles from './FormSignUpBodyWrapper.module.scss';
import { IFormSignUpBodyWrapperProps } from './FormSignUpBodyWrapper.types';

export const FormSignUpBodyWrapper = ({
	children,
	className,
	...props
}: IFormSignUpBodyWrapperProps): JSX.Element => {
	return (
		<div className={cn(styles.formSignUpBodyWrapper, className)} {...props}>
			{children}
		</div>
	);
};
