import { ProtectedAuthRouterLayout } from '@/layouts/common/permissions/ProtectedAuthRouteLayout';
import { SignUp } from '@/layouts/pages/auth/SignUp';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FM | Sign Up',
	description:
		'Step into the world of football management - strategic, train, and compete for glory! Join now and lead your team to victory.'
};

export default function Page() {
	return (
		<ProtectedAuthRouterLayout>
			<SignUp />
		</ProtectedAuthRouterLayout>
	);
}
