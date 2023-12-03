export interface IPacks {
	bronze: number;
	silver: number;
	gold: number;
}

export interface IGetInventoryRes {
	packs: IPacks;
	money: number;
}
