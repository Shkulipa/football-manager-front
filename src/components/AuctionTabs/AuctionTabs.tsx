import { ROUTES } from '@/constants/routes.enum';
import { useRouter } from 'next/navigation';
import { Tabs } from '../Tabs';

export const AuctionTabs = () => {
	const router = useRouter();

	const tabHandler = (tab: number) => {
		if (tab === 1) return router.push(ROUTES.AUCTION);
		if (tab === 2) return router.push(ROUTES.AUCTION_OWN_LOTS);
		if (tab === 3) return router.push(ROUTES.AUCTION_CREATE_LOTS);
	};
	return (
		<Tabs tabHandler={tabHandler} tabs={['Lots', 'Own Lots', 'Create Lot']} />
	);
};
