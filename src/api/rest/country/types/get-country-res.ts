export interface ICountry {
	_id: string;
	name: string;
	flag: string;
}

export interface IGetCountryRes {
	items: ICountry[];
	count: number;
}
