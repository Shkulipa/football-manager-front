import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { Shop } from '@/modules/pages/shop';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FM | Shop'
};

export default async function Page() {
	return (
		<PrivateRouteLayout>
			<Shop />
		</PrivateRouteLayout>
	);
}
