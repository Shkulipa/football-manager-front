import * as Yup from 'yup';
import { commonValidation } from '@/validations/common-validations';

export const updateUsernameValidation = Yup.object().shape({
	username: commonValidation.username
});
