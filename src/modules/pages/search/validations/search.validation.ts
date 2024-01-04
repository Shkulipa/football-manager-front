import * as Yup from 'yup';

export const searchValidation = Yup.object().shape({
	search: Yup.string().optional(),
	type: Yup.string()
		.matches(/^(player|real-team)$/, 'Type should be "player" or "real-team"')
		.required('Type is required')
});
