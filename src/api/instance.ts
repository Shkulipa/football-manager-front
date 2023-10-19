import { SERVER_URL, AXIOS_TIMEOUT } from '@/constants';
import { EUSER } from '@/constants/user.enum';
import { IAuthUser } from '@/layouts/common/user/store/user';
import axios, { AxiosInstance } from 'axios';

const axiosBaseConfig = {
	baseURL: SERVER_URL,
	timeout: AXIOS_TIMEOUT,
	withCredentials: true
};

export const apiPublic: AxiosInstance = axios.create(axiosBaseConfig);
export const apiPrivate: AxiosInstance = axios.create(axiosBaseConfig);

apiPrivate.interceptors.request.use(config => {
	if (config?.headers) {
		const parsedUser = localStorage.getItem(
			EUSER.LOCAL_STORAGE_USER
		) as unknown as IAuthUser;
		const accessToken = parsedUser?.accessToken || '';
		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});
