import { apiPrivate } from '@/api/instance';
import { IGetInventoryRes } from './types/get-inventory';
import { IOpenPackReq, IOpenPackRes } from './types/open-pack';

export const getInventory = async () =>
	await apiPrivate.get<IGetInventoryRes>(`/inventory`);

export const openPack = async (data: IOpenPackReq) =>
	await apiPrivate.post<IOpenPackRes>(`/inventory`, data);

export const apiInventory = {
	getInventory,
	openPack
};
