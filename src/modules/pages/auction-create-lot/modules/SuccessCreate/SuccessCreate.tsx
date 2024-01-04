import styles from './SuccessCreate.module.scss';
import { ISuccessCreateProps } from './SuccessCreate.types';
import { ModalWrapper, Card, Ptag, Button } from '@/components';
import { SuccessIcon } from '@/icons';

export const SuccessCreate = ({
	setStep
}: ISuccessCreateProps): JSX.Element => {
	const backToCreateLot = () => setStep('auction-create');

	return (
		<ModalWrapper>
			<Card className={styles.cardWrapper}>
				<div className={styles.titleStatus}>
					<SuccessIcon />
					<Ptag size="m">Lot Successfully was created!</Ptag>
				</div>
				<Button onClick={backToCreateLot}>Back to Create lot</Button>
			</Card>
		</ModalWrapper>
	);
};
