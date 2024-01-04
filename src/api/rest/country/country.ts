import { apiPrivate } from '@/api/instance';
import { IGetCountryReq } from './types/get-country-req';
import { IGetCountryRes } from './types/get-country-res';

export const getCountries = async (params: IGetCountryReq) =>
	await apiPrivate.get<IGetCountryRes>('/country', { params });

export const apiCountry = {
	getCountries
};
