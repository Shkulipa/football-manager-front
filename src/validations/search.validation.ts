import * as Yup from 'yup';

export const searchValidation = Yup.object().shape({
	search: Yup.string()
		.min(2, 'Should be 2+ symbols')
		.required('This Field is Required')
});
