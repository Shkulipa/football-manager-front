import { Button } from '@/components';
import { CardContentModal } from '@/components/CardContentModal';
import { ContentModal } from '@/components/ContentModal';
import { ROUTES } from '@/constants/routes.enum';
import { useRouter } from 'next/navigation';

export const FormSuccess = (): JSX.Element => {
	const { replace } = useRouter();

	return (
		<ContentModal>
			<CardContentModal
				title="Success Confirm"
				description="You success confirmed your email address then you can login"
			>
				<Button onClick={() => replace(ROUTES.AUTH_SIGN_IN)}>Login</Button>
			</CardContentModal>
		</ContentModal>
	);
};
