import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { Cancel } from '@/modules/pages/shop';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Cancel operation'
};

export default async function Page() {
	return (
		<PrivateRouteLayout>
			<Cancel />
		</PrivateRouteLayout>
	);
}
