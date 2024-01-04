import * as Yup from 'yup';
import { commonValidation } from '@/validations/common-validations';

export const updateEmailValidation = Yup.object().shape({
	email: commonValidation.email,
	password: commonValidation.password
});
