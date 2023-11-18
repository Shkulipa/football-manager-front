import { PrivateRouteLayout } from '@/layouts/permissions/PrivateRouteLayout';
import { RatingMatch } from '@/modules/pages/rating-match';

export default function Page() {
	return (
		<PrivateRouteLayout>
			<RatingMatch />
		</PrivateRouteLayout>
	);
}
