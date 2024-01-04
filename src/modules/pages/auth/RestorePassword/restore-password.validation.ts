import { commonValidation } from '@/validations/common-validations';
import * as Yup from 'yup';

export const restorePasswordValidation = Yup.object().shape({
	password: commonValidation.password,
	confirmPassword: commonValidation.confirmPassword
});
