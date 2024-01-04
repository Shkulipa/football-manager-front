import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { AuctionCreate } from '@/modules/pages/auction-create-lot';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Create Lot'
};

export default async function Page() {
	return (
		<PrivateRouteLayout>
			<AuctionCreate />
		</PrivateRouteLayout>
	);
}
