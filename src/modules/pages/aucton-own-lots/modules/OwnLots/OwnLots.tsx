import { useAppDispatch } from '@/hooks/redux';

import { useEffect, useState } from 'react';
import { IAuctionOwnLotProps } from './OwnLots.types';
import { CenterContainer, PaddingContainer } from '@/containers';
import { AuctionTabs, Button, Loader } from '@/components';
import { apiAuction } from '@/api/rest/auction/auction';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { ILot } from '@/api/rest/auction/types/lot';
import { CardLot } from '@/components/CardLot/CardLot';

export const OwnLots = ({ setStep }: IAuctionOwnLotProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [lots, setLots] = useState<ILot[]>([]);

	useEffect(() => {
		const getOwnLots = async () => {
			setIsLoading(true);
			try {
				const data = await apiAuction.getOwnLots();
				setLots(data.data);
			} catch (e) {
				handleActionErrors({ e, dispatch });
			} finally {
				setIsLoading(false);
			}
		};

		getOwnLots();
	}, []);

	const onCancel = async (id: string) => {
		setIsLoading(true);
		try {
			await apiAuction.cancelLot(id);
			setStep('success-canceled-lot');
		} catch (e) {
			handleActionErrors({ e, dispatch });
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading)
		return (
			<CenterContainer>
				<Loader />
			</CenterContainer>
		);

	return (
		<PaddingContainer>
			<AuctionTabs />
			<br />
			<br />
			{lots.map(l => {
				return (
					<CardLot key={l._id} lot={l}>
						<Button onClick={() => onCancel(l._id)} isLoading={isLoading}>
							Cancel
						</Button>
					</CardLot>
				);
			})}
		</PaddingContainer>
	);
};
