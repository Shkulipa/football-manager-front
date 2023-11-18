import cn from 'classnames';
import styles from './SignButton.module.scss';
import { ISignButtonProps } from './SignButton.types';
import { Button } from '@/components';

export const SignButton = ({
	children,
	className,
	...props
}: ISignButtonProps): JSX.Element => {
	return (
		<Button className={cn(styles.signButton, className)} {...props}>
			{children}
		</Button>
	);
};
