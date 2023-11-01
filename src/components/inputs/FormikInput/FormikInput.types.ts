import { TFormik } from '@/types/others/formik';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface IFormikInputProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	formik: TFormik;
	name: string;
}
