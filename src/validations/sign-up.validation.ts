import * as Yup from 'yup';
import { commonValidation } from './common-validations';

export const signUpValidation = Yup.object().shape({
	username: commonValidation.username,
	email: commonValidation.email,
	password: commonValidation.password,
	confirmPassword: commonValidation.confirmPassword
});
