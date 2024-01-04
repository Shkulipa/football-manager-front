import { Dispatch, SetStateAction } from 'react';

export type TStep = 'auction-own-lots' | 'success-canceled-lot';

export interface IAuctionOwnLots {
	setStep: Dispatch<SetStateAction<TStep>>;
}
