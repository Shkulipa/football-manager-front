import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { Success } from '@/modules/pages/shop';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Success operation'
};

export default async function Page() {
	return (
		<PrivateRouteLayout>
			<Success />
		</PrivateRouteLayout>
	);
}
