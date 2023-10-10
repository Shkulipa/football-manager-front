export interface IStats {
	goals: number;
	shots: IShots;
	cards: ICards;
	passes: IPasses;
	tackles: ITackles;
}

export interface IShots {
	total: number;
	on: number;
	off: number;
}

export interface ICards {
	yellow: number;
	red: number;
}

export interface IPasses {
	total: number;
	on: number;
	off: number;
}

export interface ITackles {
	total: number;
	on: number;
	off: number;
	fouls: number;
}
