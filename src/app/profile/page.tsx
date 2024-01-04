import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { Profile } from '@/modules/pages/profile/Profile';

import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile'
};

export default async function Page() {
	return (
		<PrivateRouteLayout>
			<Profile />
		</PrivateRouteLayout>
	);
}
