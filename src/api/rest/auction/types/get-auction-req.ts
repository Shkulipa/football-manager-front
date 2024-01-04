export interface IGetAuctionReq {
	limit: number;
	page: number;
	search?: string;
	priceFrom?: string;
	priceTo?: string;
	ratingFrom?: string;
	ratingTo?: string;
	ageFrom?: string;
	ageTo?: string;
	positions?: string;
	country?: string;

	// skills
	agilityFrom?: string;
	agilityTo?: string;
	jumpingFrom?: string;
	jumpingTo?: string;
	passingFrom?: string;
	passingTo?: string;
	penaltyTakingFrom?: string;
	penaltyTakingTo?: string;
	savingFrom?: string;
	savingTo?: string;
	shootingFrom?: string;
	shootingTo?: string;
	tacklingFrom?: string;
	tacklingTo?: string;
	strengthFrom?: string;
	strengthTo?: string;
}
