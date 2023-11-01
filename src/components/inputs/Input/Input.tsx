'use client';

import cn from 'classnames';
import { IInputProps } from './Input.types';
import styles from './Input.module.scss';
import { ErrorMsg } from '@/components';
import { EyeClose, EyeShow } from '@/icons';
import { useState } from 'react';

export function Input({
	className,
	value,
	onChange,
	error,
	type,
	...props
}: IInputProps): JSX.Element {
	const errorMsg = error && (
		<ErrorMsg className={styles.errorMsg}>{error}</ErrorMsg>
	);

	// handler for type password
	const [isShowPass, setIsShowPass] = useState(false);
	const typeHandler = () => {
		if (type !== 'password') return type;
		return isShowPass ? 'text' : 'password';
	};
	const eye = isShowPass ? (
		<EyeClose onClick={() => setIsShowPass(false)} width={20} height={20} />
	) : (
		<EyeShow onClick={() => setIsShowPass(true)} width={20} height={20} />
	);

	return (
		<div className={styles.inputWrapper}>
			<input
				className={cn(
					styles.input,
					{
						[styles.error]: error,
						[styles.isInputTypePassword]: type === 'password'
					},
					className
				)}
				value={value}
				onChange={onChange}
				type={typeHandler()}
				{...props}
			/>
			{type === 'password' && <div className={styles.passwordEye}>{eye}</div>}

			{errorMsg}
		</div>
	);
}
