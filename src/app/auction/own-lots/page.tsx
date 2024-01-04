import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { AuctionOwnLots } from '@/modules/pages/aucton-own-lots/AuctionOwnLots';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Own Lots'
};

export default async function Page() {
	return (
		<PrivateRouteLayout>
			<AuctionOwnLots />
		</PrivateRouteLayout>
	);
}
