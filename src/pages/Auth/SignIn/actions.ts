import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { IFormPropsAsync } from '@/types/formik';
import { handleActionErrors } from '@/utils/handle-action-errors';

import { ISignInReq } from '@/api/rest/auth/types/sign-in-req';
import { setUser } from '@/layouts/common/user/store/user';
import { apiAuth } from '@/api/rest/auth/apiAuth';
import { EKeyLocalStorage } from '@/constants/keys-local-storage';

// send sign-in form
export const signInAsync =
	({ formData, formik }: IFormPropsAsync<ISignInReq>) =>
	async (dispatch: ThunkDispatch<any, unknown, AnyAction>) => {
		try {
			const { data } = await apiAuth.login(formData);
			const userJSON = JSON.stringify(data);
			localStorage.setItem(EKeyLocalStorage.USER, userJSON);
			dispatch(setUser(data));
		} catch (e) {
			handleActionErrors({ e, dispatch, formik });
		} finally {
			formik?.setSubmitting(false);
		}
	};
