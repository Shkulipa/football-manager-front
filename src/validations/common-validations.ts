import * as Yup from 'yup';

const username = Yup.string()
	.min(4)
	.matches(
		new RegExp(/^[a-zA-Z0-9@.]*$/),
		'Username should only contain letters or digits'
	)
	.required('Required');

const email = Yup.string().email().required('Required');

const password = Yup.string()
	.min(6, 'Should be 6+ symbols')
	.required('Required');

const confirmPassword = Yup.string()
	.oneOf([Yup.ref('password')], "Passwords doesn't match")
	.required();

export const commonValidation = {
	username,
	email,
	password,
	confirmPassword
};
