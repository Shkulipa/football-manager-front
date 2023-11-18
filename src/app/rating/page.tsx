import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { Rating } from '@/modules/pages/rating';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FM | Rating'
};

export default async function Page() {
	return (
		<PrivateRouteLayout>
			<Rating />
		</PrivateRouteLayout>
	);
}
