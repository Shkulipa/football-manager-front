import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { UserTeam } from '@/modules/pages/user-team';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Your team'
};

export default async function Page() {
	return (
		<PrivateRouteLayout>
			<UserTeam />
		</PrivateRouteLayout>
	);
}
