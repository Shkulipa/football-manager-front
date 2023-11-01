import * as Yup from 'yup';

export const CreateUserTeamValidation = Yup.object().shape({
	clubName: Yup.string()
		.min(3)
		.matches(
			new RegExp(/^[a-zA-Z0-9]*$/),
			'ClubName should only contain letters or digits'
		)
		.required('Required'),
	userTeamImgField: Yup.mixed()
		.notRequired()
		.test(
			'userTeamImgField',
			'File too large. Maximum available size: 2 Mb',
			(value: any) => {
				if (value) return value && value.size <= 2 * 1e6;
				return true;
			}
		)
});
