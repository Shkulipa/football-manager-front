import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
	username: Yup.string()
		.min(4)
		.matches(
			new RegExp(/^[a-zA-Z0-9@.]*$/),
			'Username should only contain letters or digits'
		)
		.required('Required'),
	password: Yup.string().min(6, 'Should be 6+ symbols').required('Required')
});
