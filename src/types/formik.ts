import { FormikProps, FormikHelpers } from 'formik';

export type TFormik = FormikProps<any>;
export interface IFormPropsAsync<T> {
	formData: T;
	formik: FormikHelpers<T>;
}
export type TFormSubmit<T> = (d: IFormPropsAsync<T>) => void;
