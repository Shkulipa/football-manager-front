import cn from 'classnames';
import { IInputProps } from './Input.types';
import styles from './Input.module.scss';
import { ErrorMsg } from '@/components';

export function Input({
	className,
	value,
	onChange,
	error,
	...props
}: IInputProps): JSX.Element {
	const errorMsg = error && (
		<ErrorMsg className={styles.errorMsg}>{error}</ErrorMsg>
	);

	return (
		<div className={styles.inputWrapper}>
			<input
				className={cn(
					styles.input,
					{
						[styles.error]: error
					},
					className
				)}
				value={value}
				onChange={onChange}
				{...props}
			/>

			{errorMsg}
		</div>
	);
}
