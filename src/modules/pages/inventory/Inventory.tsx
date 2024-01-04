'use client';

import { apiInventory } from '@/api/rest/inventory/inventory';
import { IGetInventoryRes } from '@/api/rest/inventory/types/get-inventory';
import { Button, Loader, Ptag } from '@/components';
import { CenterContainer, PaddingContainer } from '@/containers';
import { useAppDispatch } from '@/hooks/redux';
import { Cash } from '@/icons';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { useEffect, useState } from 'react';
import styles from './Inventory.module.scss';
import {
	IOpenPackReq,
	IOpenPackRes
} from '@/api/rest/inventory/types/open-pack';
import { ResultOpenPack } from './components/ResultOpenPack';

const initialInventoryData: IGetInventoryRes = {
	money: 0,
	packs: {
		bronze: 0,
		silver: 0,
		gold: 0
	}
};

export const Inventory = () => {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [inventoryData, setInventoryData] =
		useState<IGetInventoryRes>(initialInventoryData);
	const [resultOpenPack, setResultOpenPack] = useState<IOpenPackRes | null>(
		null
	);

	useEffect(() => {
		const getPacks = async () => {
			setIsLoading(true);
			try {
				const { data } = await apiInventory.getInventory();
				setInventoryData(data);
			} catch (e) {
				handleActionErrors({ e, dispatch });
			} finally {
				setIsLoading(false);
			}
		};

		getPacks();
	}, []);

	const onOpenPack = async (pack: IOpenPackReq['pack']) => {
		setIsLoading(true);
		try {
			const { data } = await apiInventory.openPack({ pack });
			setResultOpenPack(data);
		} catch (e) {
			handleActionErrors({ e, dispatch });
		} finally {
			setIsLoading(false);
		}
	};

	const onOpenBronze = async () => onOpenPack('bronze');
	const onOpenSilver = async () => onOpenPack('silver');
	const onOpenGold = async () => onOpenPack('gold');

	if (isLoading || !inventoryData)
		return (
			<CenterContainer>
				<Loader size="l" />
			</CenterContainer>
		);

	if (resultOpenPack) {
		return (
			<PaddingContainer>
				<ResultOpenPack
					result={resultOpenPack}
					closeOpenResult={() => setResultOpenPack(null)}
				/>
			</PaddingContainer>
		);
	}

	return (
		<PaddingContainer>
			<div className={styles.moneyWrapper}>
				<Ptag size="l"> Money: {inventoryData.money}</Ptag>
				<div className={styles.cashIcon}>
					<Cash />
				</div>
			</div>
			<div className={styles.packsWrapper}>
				{inventoryData.packs.bronze > 0 && (
					<div className={styles.packCard}>
						<div>Bronze</div>
						<div>count: {inventoryData.packs.bronze}</div>
						<Button onClick={onOpenBronze}>Open</Button>
					</div>
				)}
				{inventoryData.packs.silver > 0 && (
					<div className={styles.packCard}>
						<div>Silver</div>
						<div>count: {inventoryData.packs.silver}</div>
						<Button onClick={onOpenSilver}>Open</Button>
					</div>
				)}
				{inventoryData.packs.gold > 0 && (
					<div className={styles.packCard}>
						<div>Gold</div>
						<div>count: {inventoryData.packs.gold}</div>
						<Button onClick={onOpenGold}>Open</Button>
					</div>
				)}
			</div>
		</PaddingContainer>
	);
};
