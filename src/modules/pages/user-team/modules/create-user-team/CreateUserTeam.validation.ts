import { commonValidation } from '@/validations/common-validations';
import * as Yup from 'yup';
import { clubName } from '../../validation';

export const CreateUserTeamValidation = Yup.object().shape({
	clubName,
	userTeamImgField: commonValidation.file
});
