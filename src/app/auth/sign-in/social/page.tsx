import { ProtectedAuthRouterLayout } from '@/layouts/permissions/ProtectedAuthRouteLayout';
import { SocialIn } from '@/modules/pages/auth/SocialIn';

export default function Page() {
	return (
		<ProtectedAuthRouterLayout>
			<SocialIn />
		</ProtectedAuthRouterLayout>
	);
}
