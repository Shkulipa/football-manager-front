export interface IPlayerRewardData {
	_id: string;
	username: string;
	money: number;
	oldRating: number;
	newRating: number;
}

export interface IMatchReward {
	rewardPlayer1: IPlayerRewardData;
	rewardPlayer2: IPlayerRewardData;
}
