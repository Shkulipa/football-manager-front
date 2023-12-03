import { apiPrivate } from '@/api/instance';
import { IBuyProductReq, IBuyProductRes } from './types/buy-product';

export const buyProduct = async (data: IBuyProductReq) =>
	await apiPrivate.post<IBuyProductRes>(
		'/shop/create-session-buying-product',
		data
	);

export const apiShop = {
	buyProduct
};
