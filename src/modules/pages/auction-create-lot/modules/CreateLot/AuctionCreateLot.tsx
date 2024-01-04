'use client';

import styles from './AuctionCreateLot.module.scss';
import { apiUserTeam } from '@/api/rest/user-team/apiUserTeam';
import { AuctionTabs, Button, FormikInput, Loader } from '@/components';
import { CenterContainer, PaddingContainer } from '@/containers';
import { useAppDispatch } from '@/hooks/redux';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { useEffect, useState } from 'react';
import {
	IAuctionCreateLotProps,
	IFormikAuctionCreateLot,
	IPlayerSelectCreateLot
} from './AuctionCreateLot.types';
import { useFormik } from 'formik';
import { auctionCreateLotValidation } from '@/validations/auction-create-lot.validation';
import { CardForm } from '@/components/CardForm';
import { apiAuction } from '@/api/rest/auction/auction';

const initialValues: IFormikAuctionCreateLot = {
	playerId: '',
	price: 0
};

export const AuctionCreateLot = ({
	setStep
}: IAuctionCreateLotProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [players, setPlayers] = useState<IPlayerSelectCreateLot[]>([]);

	useEffect(() => {
		const getOwnSquad = async () => {
			setIsLoading(true);
			try {
				const data = await apiUserTeam.getOwnTeam();
				const main = Object.values(data.data.main!).map(p => ({
					_id: p._id,
					number: p.number,
					name: p.name
				}));
				const bench = data.data.bench.map(p => ({
					_id: p._id,
					number: p.number,
					name: p.name
				}));
				const reserve = data.data.reserve.map(p => ({
					_id: p._id,
					number: p.number,
					name: p.name
				}));
				setPlayers([...main, ...bench, ...reserve]);
			} catch (e) {
				handleActionErrors({ e, dispatch });
			} finally {
				setIsLoading(false);
			}
		};

		getOwnSquad();
	}, []);

	const formik = useFormik<IFormikAuctionCreateLot>({
		initialValues,
		validationSchema: auctionCreateLotValidation,
		onSubmit: async (values, formik) => {
			try {
				await apiAuction.createLot({
					...values,
					price: +values.price
				});
				setStep('success-lot-create');
			} catch (e) {
				handleActionErrors({
					e,
					dispatch
				});
			} finally {
				formik?.setSubmitting(false);
			}
		},
		validateOnMount: true
	});

	if (isLoading) return <Loader />;

	return (
		<CenterContainer>
			<PaddingContainer>
				<CardForm onSubmit={formik.handleSubmit} className={styles.form}>
					<AuctionTabs />

					<div className={styles.inputWrapper}>
						<div>Player: </div>
						<select
							id="playerId"
							name="playerId"
							value={formik.values.playerId}
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
						>
							<option value="" disabled>
								Pick Player
							</option>
							{players.map(p => (
								<option key={p._id} value={p._id}>
									{p.number} {p.name}
								</option>
							))}
						</select>
					</div>
					<div className={styles.inputWrapper}>
						<div>Price: </div>
						<FormikInput
							key="price"
							id="price"
							name="price"
							placeholder="Price"
							formik={formik}
						/>
					</div>
					<Button
						type="submit"
						disabled={!formik.isValid}
						isLoading={isLoading || formik.isSubmitting}
					>
						Create Lot
					</Button>
				</CardForm>
			</PaddingContainer>
		</CenterContainer>
	);
};
