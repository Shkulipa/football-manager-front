import { ProtectedAuthRouterLayout } from '@/layouts/permissions/ProtectedAuthRouteLayout';
import { ForgotPassword } from '@/modules/pages/auth/ForgotPassword/ForgotPass';

import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Forgot password'
};

export default function Page() {
	return (
		<ProtectedAuthRouterLayout>
			<ForgotPassword />
		</ProtectedAuthRouterLayout>
	);
}
