import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { Inventory } from '@/modules/pages/inventory/Inventory';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FM | Inventory'
};

export default async function Page() {
	return (
		<PrivateRouteLayout>
			<Inventory />
		</PrivateRouteLayout>
	);
}
