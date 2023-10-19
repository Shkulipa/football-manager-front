import { ProtectedAuthRouterLayout } from '@/layouts/permissions/ProtectedAuthRouteLayout';
import { SignIn } from '@/pages/Auth/SignIn/SignIn';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FM | Sign In',
	description:
		'Sign in to access your account. Enter your credentials to securely log in and manage your account settings.'
};

export default function Auth() {
	return (
		<ProtectedAuthRouterLayout>
			<SignIn />
		</ProtectedAuthRouterLayout>
	);
}
