import * as Yup from 'yup';

export const clubName = Yup.string()
	.min(3)
	.max(50)
	.matches(
		new RegExp(/^[a-zA-Z0-9\s]*$/),
		'Club name should only contain letters, digits, or spaces'
	)
	.required('This Field is Required');
