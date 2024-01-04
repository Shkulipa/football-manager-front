import * as Yup from 'yup';
import { commonValidation } from '@/validations/common-validations';

export const updatePasswordValidation = Yup.object().shape({
	password: commonValidation.password,
	confirmPassword: commonValidation.confirmPassword
});
