import { apiPrivate } from '@/api/instance';
import { IGetAuctionReq } from './types/get-auction-req';
import { ICreateAuctionLotReq } from './types/create-auction-lot-req';
import { IServerSuccessRes } from '../types/server-success-res';
import { IGetLotsRes } from './types/get-lots-res';
import { ILot } from './types/lot';

export const getLots = async (params: IGetAuctionReq) =>
	await apiPrivate.get<IGetLotsRes>('/auction', { params });

export const getOwnLots = async () =>
	await apiPrivate.get<ILot[]>('/auction/own-lots');

export const createLot = async (data: ICreateAuctionLotReq) =>
	await apiPrivate.post<IServerSuccessRes>('/auction', data);

export const buyLot = async (id: string) =>
	await apiPrivate.post<IServerSuccessRes>(`/auction/${id}`);

export const cancelLot = async (id: string) =>
	await apiPrivate.delete<IServerSuccessRes>(`/auction/${id}`);

export const apiAuction = {
	getLots,
	getOwnLots,
	createLot,
	buyLot,
	cancelLot
};
