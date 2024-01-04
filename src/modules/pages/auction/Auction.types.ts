import { IGetAuctionReq } from '@/api/rest/auction/types/get-auction-req';

export interface IFormikAuction
	extends Omit<IGetAuctionReq, 'limit' | 'page' | 'positions' | 'country'> {}
