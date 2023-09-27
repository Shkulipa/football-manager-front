import axios, { InternalAxiosRequestConfig } from 'axios';

const $axios = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
	responseType: 'json'
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {
	const token = localStorage.getItem('token');
	if (token) config.headers.authorization = `Bearer ${token}`;
	return config;
};

$axios.interceptors.request.use(authInterceptor);

export default $axios;
