'use client';

import { Button, Htag, Ptag } from '@/components';
import styles from './Pack.module.scss';
import { IPackProps } from './Pack.types';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { useAppDispatch } from '@/hooks/redux';
import { useState } from 'react';
import { apiShop } from '@/api/rest/shop/shop';
import { useRouter } from 'next/navigation';
import { Cash } from '@/icons';

export const Pack = ({
	name,
	price,
	description,
	priceStripeId
}: IPackProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const onBuy = async () => {
		setIsLoading(true);
		try {
			const { data } = await apiShop.buyProduct({ price: priceStripeId });
			router.push(data.url);
		} catch (e) {
			handleActionErrors({ e, dispatch });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.packWrapper}>
			<Htag tag="h3">{name}</Htag>
			<ul className={styles.listDetails}>
				{description.map(i => (
					<div className={styles.moneyRewardDescription} key={i}>
						{i}

						{i.includes('money') && (
							<div className={styles.cashIcon}>
								<Cash />
							</div>
						)}
					</div>
				))}
			</ul>
			<Ptag>{price} $</Ptag>
			<Button onClick={onBuy} isLoading={isLoading}>
				Buy
			</Button>
		</div>
	);
};
