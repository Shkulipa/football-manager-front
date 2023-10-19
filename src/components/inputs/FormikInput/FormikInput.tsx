import { getFieldError } from '@/utils/get-field-error';
import { IFormikInputProps } from './FormikInput.types';
import { Input } from '..';
import { ChangeEvent } from 'react';

export function FormikInput({
	formik,
	onChange,
	...props
}: IFormikInputProps): JSX.Element {
	const field = formik.getFieldProps(props.name);

	const { touched, error } = formik.getFieldMeta(props.name);
	const fieldError = getFieldError({ touched, error });

	const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
		field.onChange(e);

		if (onChange) {
			onChange(e);
		}
	};

	return (
		<Input {...field} {...props} onChange={handlerChange} error={fieldError} />
	);
}
