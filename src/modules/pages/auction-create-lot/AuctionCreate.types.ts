import { Dispatch, SetStateAction } from 'react';

export type TStep = 'auction-create' | 'success-lot-create';

export interface IAuctionCreate {
	setStep: Dispatch<SetStateAction<TStep>>;
}
