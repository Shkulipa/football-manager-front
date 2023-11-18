import { ProtectedAuthRouterLayout } from '@/layouts/permissions/ProtectedAuthRouteLayout';
import { SignIn } from '@/modules/pages/auth/SignIn/SignIn';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FM | Sign In',
	description:
		'Sign in to access your account. Enter your credentials to securely log in and manage your account settings.'
};

export default function Page() {
	return (
		<ProtectedAuthRouterLayout>
			<SignIn />
		</ProtectedAuthRouterLayout>
	);
}
