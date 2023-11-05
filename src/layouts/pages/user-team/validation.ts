import * as Yup from 'yup';

export const clubName = Yup.string()
	.min(3)
	.max(50)
	.matches(
		new RegExp(/^[a-zA-Z0-9]*$/),
		'ClubName should only contain letters or digits'
	)
	.required('Required');
