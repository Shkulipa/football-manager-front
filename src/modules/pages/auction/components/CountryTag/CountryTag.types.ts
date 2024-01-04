import { ICountry } from '@/api/rest/country/types/get-country-res';
import { ButtonHTMLAttributes } from 'react';

export interface ICountryTagProps
	extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
	country: ICountry;
}
