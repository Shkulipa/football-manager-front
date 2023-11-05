import { Button, ContentModal } from '@/components';
import { CardContentModal } from '@/components/CardContentModal';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setStep } from '../store/userTeam.slice';
import { useEffect } from 'react';

export const SuccessDeletedTeam = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { initVersionTeam } = useAppSelector(s => s.userTeamReducer);
	const onClick = () => dispatch(setStep('create-user-team'));

	useEffect(() => {
		if (initVersionTeam) {
			dispatch(setStep('user-team'));
			return;
		}
	}, [initVersionTeam]);

	return (
		<ContentModal>
			<CardContentModal
				title="Success"
				description="Your team was deleted successfully!"
			>
				<Button onClick={onClick}>Go create again?</Button>
			</CardContentModal>
		</ContentModal>
	);
};
