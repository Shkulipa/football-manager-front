import { SERVER_URL, AXIOS_TIMEOUT } from '@/constants';
import { EUSER } from '@/constants/user.enum';
import { logout } from '@/layouts/common/user/store/user';
import axios, { isAxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { apiAuth } from './rest/auth/apiAuth';
import { ServerStatus } from '@/constants/server-status.enum';
import { TStore } from '@/store/store';
import {
	setNetworkError,
	showGlobalError
} from '@/components/GlobalModal/store';
import { ISignInRes } from './rest/auth/types/sign-in-res';

/**
 * @info
 * for call stor in axios interceptor
 * https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 */
let store = {} as TStore;
export const injectStore = (_store: TStore): void => {
	store = _store;
};

const axiosBaseConfig: AxiosRequestConfig = {
	baseURL: SERVER_URL,
	timeout: AXIOS_TIMEOUT,
	withCredentials: true
};

export const apiPublic: AxiosInstance = axios.create(axiosBaseConfig);
export const apiPrivate: AxiosInstance = axios.create(axiosBaseConfig);

/**
 * @info
 * attach access token to request
 */
apiPrivate.interceptors.request.use(config => {
	if (config?.headers) {
		const userJSON = localStorage.getItem(EUSER.LOCAL_STORAGE_USER);
		if (!userJSON) return config;

		const parsedUser = JSON.parse(userJSON) as unknown as ISignInRes;
		const accessToken = parsedUser?.accessToken || '';

		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

/**
 * @info
 * refresh tokens logic on the response
 */
apiPrivate.interceptors.response.use(null, async (error: any) => {
	if (!error.response && error.message === 'Network Error') {
		store.dispatch(setNetworkError(true));
		return Promise.reject({});
	}

	const originalRequest = error.config;
	if (
		error.response.status === ServerStatus.NOT_AUTHORIZED &&
		error.config &&
		!error.config._isRetry
	) {
		originalRequest._isRetry = true;

		try {
			/**
			 * @info
			 * we can call a apiPublic because
			 * we set a refresh token in the cookies
			 */
			const res = await apiAuth.refreshToken();
			const user = res.data;

			/**
			 * @info
			 * refresh token local
			 */
			localStorage.setItem(EUSER.LOCAL_STORAGE_USER, JSON.stringify(user));

			/**
			 * @info
			 * make request again
			 */
			return apiPrivate.request(originalRequest);
		} catch (err) {
			if (isAxiosError(err) && err.response) {
				store.dispatch(showGlobalError(err.response.data));
			}
			store.dispatch(logout());
			return Promise.reject(err);
		}
	}

	console.error(error);
	return Promise.reject({
		...error,
		response: { data: { message: 'Unknown error' } }
	});
});
