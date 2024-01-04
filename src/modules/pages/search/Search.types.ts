export type TSearch = 'player' | 'real-team';

export interface IFormikSearch {
	type: TSearch;
	search: string;
}
