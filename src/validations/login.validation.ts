import * as Yup from 'yup';
import { commonValidation } from './common-validations';

export const loginValidation = Yup.object().shape({
	username: commonValidation.username,
	password: commonValidation.password
});
