import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { Messages } from '@/modules/pages/messages';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FM | Messages'
};

export default async function Page() {
	return (
		<PrivateRouteLayout>
			<Messages />
		</PrivateRouteLayout>
	);
}
