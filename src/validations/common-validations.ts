import * as Yup from 'yup';

const username = Yup.string()
	.min(4)
	.matches(
		new RegExp(/^[a-zA-Z0-9@.]*$/),
		'Username should only contain letters or digits'
	)
	.required('This Field is Required');

const email = Yup.string().email().required('This Field is Required');

const password = Yup.string()
	.min(6, 'Should be 6+ symbols')
	.matches(
		/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
		'Should contain at least one letter, one digit, and one special character'
	)
	.required('This Field is Required');

const confirmPassword = Yup.string()
	.oneOf([Yup.ref('password')], "Passwords doesn't match")
	.required('This Field is Required');

const file = Yup.mixed()
	.notRequired()
	.test(
		'userTeamImgField',
		'File too large. Maximum available size: 2 Mb',
		(value: any) => {
			if (value) return value && value.size <= 2 * 1e6;
			return true;
		}
	);

export const commonValidation = {
	username,
	email,
	password,
	confirmPassword,
	file
};
