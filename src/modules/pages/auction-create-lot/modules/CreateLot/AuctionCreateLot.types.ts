import { IPlayer } from 'footballsimulationengine';
import { IAuctionCreate } from '../../AuctionCreate.types';
import { ICreateAuctionLotReq } from '@/api/rest/auction/types/create-auction-lot-req';

export interface IAuctionCreateLotProps extends IAuctionCreate {}

export interface IFormikAuctionCreateLot extends ICreateAuctionLotReq {}

export interface IPlayerSelectCreateLot
	extends Pick<IPlayer, '_id' | 'number' | 'name'> {}
