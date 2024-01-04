import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { Auction } from '@/modules/pages/auction';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Auction'
};

export default async function Page() {
	return (
		<PrivateRouteLayout>
			<Auction />
		</PrivateRouteLayout>
	);
}
