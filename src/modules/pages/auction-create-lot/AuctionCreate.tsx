'use client';

import { useUnmount } from '@/hooks/useUnmount';
import { useState } from 'react';
import { SuccessCreate } from './modules/SuccessCreate/SuccessCreate';
import { AuctionCreateLot } from './modules/CreateLot/AuctionCreateLot';
import { TStep } from './AuctionCreate.types';

export const AuctionCreate = (): JSX.Element => {
	const [step, setStep] = useState<TStep>('auction-create');

	useUnmount(() => setStep('auction-create'));

	let content: JSX.Element;
	switch (step) {
		case 'auction-create':
			content = <AuctionCreateLot setStep={setStep} />;
			break;
		case 'success-lot-create':
			content = <SuccessCreate setStep={setStep} />;
			break;
		default:
			content = <></>;
	}

	return content;
};
