import { ICountry } from './country';

export interface ILeague {
	_id: string;
	country: ICountry;
	name: string;
	logoLeague: string;
}
