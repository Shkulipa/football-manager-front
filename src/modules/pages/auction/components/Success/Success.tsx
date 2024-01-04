'use client';

import { Button, Card, ModalWrapper, Ptag } from '@/components';
import styles from './Status.module.scss';
import { SuccessIcon } from '@/icons';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes.enum';

export const Success = (): JSX.Element => {
	const router = useRouter();

	const goToTeam = () => {
		router.replace(ROUTES.USER_TEAM);
	};

	return (
		<ModalWrapper>
			<Card className={styles.cardWrapper}>
				<div className={styles.titleStatus}>
					<SuccessIcon />
					<Ptag size="m">
						Success operation buying player, you can find your new player in
						Squad of your team, in reserve
					</Ptag>
				</div>
				<Button onClick={goToTeam}>Go to Team</Button>
			</Card>
		</ModalWrapper>
	);
};
