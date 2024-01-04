import { commonValidation } from '@/validations/common-validations';
import * as Yup from 'yup';

export const forgotPasswordValidation = Yup.object().shape({
	email: commonValidation.email
});
