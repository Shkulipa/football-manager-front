'use client';

import { Button, Card, ModalWrapper, Ptag } from '@/components';
import { PaddingContainer } from '@/containers';
import styles from './styles/Status.module.scss';
import { Error } from '@/icons';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes.enum';

export const Cancel = (): JSX.Element => {
	const router = useRouter();

	const onBackShop = () => {
		router.replace(ROUTES.SHOP);
	};

	return (
		<PaddingContainer className={styles.statusWrapper}>
			<ModalWrapper>
				<Card className={styles.cardWrapper}>
					<div className={styles.titleStatus}>
						<Error className={styles.icon} direction="top" fill="#000" />
						<Ptag size="m">Operation was canceled, please try again</Ptag>
					</div>
					<Button onClick={onBackShop}>Back Shop</Button>
				</Card>
			</ModalWrapper>
		</PaddingContainer>
	);
};
