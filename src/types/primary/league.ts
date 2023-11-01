import { ICountry } from 'footballsimulationengine';

export interface ILeague {
	_id: string;
	country: ICountry;
	name: string;
	logoLeague: string;
}
