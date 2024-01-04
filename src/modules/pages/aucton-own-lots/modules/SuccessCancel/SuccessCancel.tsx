import { useRouter } from 'next/navigation';
import styles from './SuccessCancel.module.scss';
import { ModalWrapper, Card, Ptag, Button } from '@/components';
import { SuccessIcon } from '@/icons';
import { ROUTES } from '@/constants/routes.enum';

export const SuccessCancel = (): JSX.Element => {
	const router = useRouter();

	const backToAllLots = () => router.replace(ROUTES.AUCTION);

	return (
		<ModalWrapper>
			<Card className={styles.cardWrapper}>
				<div className={styles.titleStatus}>
					<SuccessIcon />
					<Ptag size="m">Lot Successfully was canceled!</Ptag>
				</div>
				<Button onClick={backToAllLots}>Back to All Lots</Button>
			</Card>
		</ModalWrapper>
	);
};
