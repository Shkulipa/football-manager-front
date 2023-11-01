import { Button, ContentModal } from '@/components';
import { CardContentModal } from '@/components/CardContentModal';
import { useAppDispatch } from '@/hooks/redux';
import { setStep } from '../store/userTeam.slice';

export const SuccessCreatedUserTeam = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const onClick = () => dispatch(setStep(null));

	return (
		<ContentModal>
			<CardContentModal
				title="Success"
				description="Your team has been successfully created, now you can go to the squad"
			>
				<Button onClick={onClick}>Go to Squad</Button>
			</CardContentModal>
		</ContentModal>
	);
};
