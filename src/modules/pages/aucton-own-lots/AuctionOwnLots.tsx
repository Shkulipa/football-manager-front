'use client';

import { useState } from 'react';
import { TStep } from './AuctionOwnLots.types';
import { OwnLots } from './modules/OwnLots/OwnLots';
import { useUnmount } from '@/hooks/useUnmount';
import { SuccessCancel } from './modules/SuccessCancel/SuccessCancel';

export const AuctionOwnLots = (): JSX.Element => {
	const [step, setStep] = useState<TStep>('auction-own-lots');

	useUnmount(() => setStep('auction-own-lots'));

	let content: JSX.Element;
	switch (step) {
		case 'auction-own-lots':
			content = <OwnLots setStep={setStep} />;
			break;
		case 'success-canceled-lot':
			content = <SuccessCancel />;
			break;
		default:
			content = <></>;
	}

	return content;
};
