import { ProtectedAuthRouterLayout } from '@/layouts/permissions/ProtectedAuthRouteLayout';
import { RestorePassword } from '@/modules/pages/auth/RestorePassword/RestorePass';

import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Restore password'
};

export default function Page() {
	return (
		<ProtectedAuthRouterLayout>
			<RestorePassword />
		</ProtectedAuthRouterLayout>
	);
}
