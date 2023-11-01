import { Button } from '@/components';
import { CardContentModal } from '@/components/CardContentModal';
import { ContentModal } from '@/components/ContentModal';
import { ROUTES } from '@/constants/routes.enum';
import { useRouter } from 'next/navigation';

export const ModalConfirmedAccountYet = (): JSX.Element => {
	const { replace } = useRouter();

	return (
		<ContentModal>
			<CardContentModal
				title="Account confirmed yet"
				description="Your account was confirmed yet, you can login already"
			>
				<Button onClick={() => replace(ROUTES.AUTH_SIGN_IN)}>Login</Button>
			</CardContentModal>
		</ContentModal>
	);
};
