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
