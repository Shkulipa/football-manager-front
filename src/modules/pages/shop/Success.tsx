'use client';

import { Button, Card, ModalWrapper, Ptag } from '@/components';
import { PaddingContainer } from '@/containers';
import styles from './styles/Status.module.scss';
import { SuccessIcon } from '@/icons';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes.enum';

export const Success = (): JSX.Element => {
	const router = useRouter();

	const onBackShop = () => {
		router.replace(ROUTES.SHOP);
	};
	const onInventory = () => {
		router.replace(ROUTES.INVENTORY);
	};

	return (
		<PaddingContainer className={styles.statusWrapper}>
			<ModalWrapper>
				<Card className={styles.cardWrapper}>
					<div className={styles.titleStatus}>
						<SuccessIcon />
						<Ptag size="m">Success operation buying product</Ptag>
					</div>
					<Button onClick={onBackShop}>Back Shop</Button>

					<Ptag size="s">
						You can go to &apos;Inventory&apos;, and open pack or check your
						&apos;Money&apos;
					</Ptag>
					<Button onClick={onInventory}>Go to Inventory</Button>
				</Card>
			</ModalWrapper>
		</PaddingContainer>
	);
};
