'use client';

import { CenterContainer, PaddingContainer } from '@/containers';
import styles from './Auction.module.scss';
import { useFormik } from 'formik';
import cn from 'classnames';
import Pagination from 'rc-pagination';
import { auctionValidation } from '@/validations/auction.validation';
import { AuctionTabs, Button, FormikInput, Htag, Loader } from '@/components';
import { Rating } from 'react-simple-star-rating';
import { useAppDispatch } from '@/hooks/redux';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { apiAuction } from '@/api/rest/auction/auction';
import { ChangeEvent, useEffect, useState } from 'react';
import { IFormikAuction } from './Auction.types';
import { CardLot } from '../../../components/CardLot/CardLot';
import { positions } from '@/constants/zone-positons';
import { PositionsTag } from './components/PositionsTag/PositionsTag';
import { IGetAuctionReq } from '@/api/rest/auction/types/get-auction-req';
import { ICountry } from '@/api/rest/country/types/get-country-res';
import { apiCountry } from '@/api/rest/country/country';
import { CountryTag } from './components/CountryTag/CountryTag';
import { Success } from './components/Success/Success';
import { ILot } from '@/api/rest/auction/types/lot';

const initialValues: IFormikAuction = {
	search: '',
	ageFrom: '',
	ageTo: '',
	priceFrom: '',
	priceTo: '',
	ratingFrom: '',
	ratingTo: '',

	// skills
	agilityFrom: '',
	agilityTo: '',
	jumpingFrom: '',
	jumpingTo: '',
	penaltyTakingFrom: '',
	penaltyTakingTo: '',
	passingFrom: '',
	passingTo: '',
	savingFrom: '',
	savingTo: '',
	shootingFrom: '',
	shootingTo: '',
	tacklingFrom: '',
	tacklingTo: '',
	strengthFrom: '',
	strengthTo: ''
};

const initPositions = [
	...(Object.values(positions.attackers) as string[]),
	...(Object.values(positions.defenders) as string[]),
	...(Object.values(positions.midfielders) as string[])
];

export const Auction = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const [paginationData, setPaginationData] = useState({
		page: 1,
		total: 0,
		limit: 25
	});
	const [isLoading, setLoading] = useState(false);
	const [cards, setCards] = useState<ILot[]>([]);

	const [countries, setCountries] = useState<ICountry[]>([]);
	const [countriesSelected, setCountriesSelected] = useState<ICountry[]>([]);

	const [positionsSelected, setPositions] = useState<string[]>([]);

	const [isSuccessBuy, setIsSuccessBuy] = useState(false);

	useEffect(() => {
		const getCountries = async () => {
			setLoading(true);
			try {
				const { data } = await apiCountry.getCountries({
					page: 1,
					limit: 1000
				});
				setCountries(data.items);
			} catch (e) {
				handleActionErrors({
					e,
					dispatch
				});
			} finally {
				setLoading(false);
			}
		};
		getCountries();
	}, []);

	const getLots = async () => {
		setLoading(true);
		try {
			const { data } = await apiAuction.getLots({
				page: paginationData.page,
				limit: paginationData.limit
			});
			setPaginationData(s => ({ ...s, total: data.count }));
			setCards(data.items);
		} catch (e) {
			handleActionErrors({
				e,
				dispatch
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getLots();
	}, [paginationData.page]);

	const formik = useFormik<IFormikAuction>({
		initialValues,
		validationSchema: auctionValidation,
		onSubmit: async (values, formik) => {
			try {
				const params = Object.fromEntries(
					Object.entries(values).filter(v => Boolean(v[1]) != false)
				) as IFormikAuction;

				const req: IGetAuctionReq = {
					...params,
					page: paginationData.page,
					limit: paginationData.limit
				};

				if (positionsSelected.length > 0)
					req.positions = positionsSelected.join(',');
				if (countriesSelected.length > 0)
					req.country = countriesSelected.map(c => c._id).join(',');

				const { data } = await apiAuction.getLots(req);
				setCards(data.items);
			} catch (e) {
				handleActionErrors({
					e,
					dispatch
				});
			} finally {
				formik?.setSubmitting(false);
			}
		}
	});

	const positionHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		setPositions(s => [...s, value]);
	};

	const deletePosition = (tag: string) => {
		setPositions(s => [...s.filter(p => p !== tag)]);
	};

	const deleteCountry = (id: string) => {
		setCountriesSelected(s => [...s.filter(p => p._id !== id)]);
	};

	const onBuy = async (id: string) => {
		setLoading(true);
		try {
			await apiAuction.buyLot(id);
			setIsSuccessBuy(true);
		} catch (e) {
			handleActionErrors({
				e,
				dispatch
			});
		} finally {
			setLoading(false);
		}
	};

	const selectCountryHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		const country = countries.find(c => c._id === value);
		if (!country) return;
		setCountriesSelected(s => [...s, country]);
	};

	if (isLoading)
		return (
			<CenterContainer>
				<Loader />
			</CenterContainer>
		);

	if (isSuccessBuy) return <Success />;

	return (
		<>
			<PaddingContainer>
				<div className={styles.auctionWrapper}>
					<AuctionTabs />

					<Htag className={styles.title} tag="h2">
						Common Info
					</Htag>
					<form
						onSubmit={formik.handleSubmit}
						autoComplete="off"
						className={styles.filtersWrapper}
					>
						<div className={styles.filters}>
							<div className={styles.filterBlock}>
								<div>Name: </div>
								<FormikInput
									key="search"
									id="search"
									name="search"
									placeholder="Enter Name"
									formik={formik}
								/>
							</div>

							<div className={styles.filterBlock}>
								<div>Rating: </div>
								<div className={styles.ratingWrapper}>
									<div>Min</div>
									<Rating
										allowFraction
										onClick={rating =>
											formik.setFieldValue('ratingFrom', rating)
										}
									/>
								</div>
								<div className={styles.ratingWrapper}>
									<div>Max</div>
									<Rating
										allowFraction
										onClick={rating => formik.setFieldValue('ratingTo', rating)}
									/>
								</div>
							</div>

							<div className={styles.filterBlock}>
								<div>Price: </div>
								<FormikInput
									key="priceFrom"
									id="priceFrom"
									name="priceFrom"
									placeholder="Min Price"
									formik={formik}
								/>
								<FormikInput
									key="priceTo"
									id="priceTo"
									name="priceTo"
									placeholder="Max Price"
									formik={formik}
								/>
							</div>

							<div className={styles.filterBlock}>
								<div>Age: </div>
								<FormikInput
									key="ageFrom"
									id="ageFrom"
									name="ageFrom"
									placeholder="Min Age"
									formik={formik}
								/>
								<FormikInput
									key="ageTo"
									id="ageTo"
									name="ageTo"
									placeholder="Max Age"
									formik={formik}
								/>
							</div>

							<div className={cn(styles.filterBlock, styles.tagsWrapper)}>
								<div>Positions: </div>
								<select
									name="positions"
									value=""
									onChange={positionHandler}
									className={styles.select}
								>
									<option value="" disabled>
										Pick Position
									</option>
									{initPositions.map(p => (
										<option
											key={p}
											value={p}
											hidden={positionsSelected.includes(p)}
										>
											{p}
										</option>
									))}
								</select>
								<div className={styles.tags}>
									{positionsSelected.map(p => (
										<PositionsTag
											key={p}
											positionName={p}
											onClick={() => deletePosition(p)}
										/>
									))}
								</div>
							</div>

							<div className={cn(styles.filterBlock, styles.tagsWrapper)}>
								<div>Country: </div>
								<select
									name="country"
									value=""
									onChange={selectCountryHandler}
									className={styles.select}
								>
									<option value="">Pick Country</option>
									{countries.map(c => (
										<option
											key={c._id}
											value={c._id}
											hidden={countriesSelected.map(c => c._id).includes(c._id)}
										>
											{c.name}
										</option>
									))}
								</select>
								<div className={styles.tags}>
									{countriesSelected.map(c => (
										<CountryTag
											key={c._id}
											country={c}
											onClick={() => deleteCountry(c._id)}
										/>
									))}
								</div>
							</div>
						</div>

						<Htag className={styles.title} tag="h2">
							Skill Player
						</Htag>
						<div className={styles.filters}>
							<div className={styles.filterBlock}>
								<div>Agility: </div>
								<FormikInput
									key="agilityFrom"
									id="agilityFrom"
									name="agilityFrom"
									placeholder="Min Agility"
									formik={formik}
								/>
								<FormikInput
									key="agilityTo"
									id="agilityTo"
									name="agilityTo"
									placeholder="Max Agility"
									formik={formik}
								/>
							</div>
							<div className={styles.filterBlock}>
								<div>Jumping: </div>
								<FormikInput
									key="jumpingFrom"
									id="jumpingFrom"
									name="jumpingFrom"
									placeholder="Min Jumping"
									formik={formik}
								/>
								<FormikInput
									key="jumpingTo"
									id="jumpingTo"
									name="jumpingTo"
									placeholder="Max Jumping"
									formik={formik}
								/>
							</div>
							<div className={styles.filterBlock}>
								<div>Penalty Taking: </div>
								<FormikInput
									key="penaltyTakingFrom"
									id="penaltyTakingFrom"
									name="penaltyTakingFrom"
									placeholder="Min Penalty Taking"
									formik={formik}
								/>
								<FormikInput
									key="penaltyTakingTo"
									id="penaltyTakingTo"
									name="penaltyTakingTo"
									placeholder="Max Penalty Taking"
									formik={formik}
								/>
							</div>
							<div className={styles.filterBlock}>
								<div>Saving: </div>
								<FormikInput
									key="savingFrom"
									id="savingFrom"
									name="savingFrom"
									placeholder="Min Saving"
									formik={formik}
								/>
								<FormikInput
									key="savingTo"
									id="savingTo"
									name="savingTo"
									placeholder="Max Saving"
									formik={formik}
								/>
							</div>
							<div className={styles.filterBlock}>
								<div>Passing: </div>
								<FormikInput
									key="passingFrom"
									id="passingFrom"
									name="passingFrom"
									placeholder="Min Passing"
									formik={formik}
								/>
								<FormikInput
									key="passingTo"
									id="passingTo"
									name="passingTo"
									placeholder="Max Passing"
									formik={formik}
								/>
							</div>
							<div className={styles.filterBlock}>
								<div>Shooting: </div>
								<FormikInput
									key="shootingFrom"
									id="shootingFrom"
									name="shootingFrom"
									placeholder="Min Shooting"
									formik={formik}
								/>
								<FormikInput
									key="shootingTo"
									id="shootingTo"
									name="shootingTo"
									placeholder="Max Shooting"
									formik={formik}
								/>
							</div>
							<div className={styles.filterBlock}>
								<div>Tackling: </div>
								<FormikInput
									key="tacklingFrom"
									id="tacklingFrom"
									name="tacklingFrom"
									placeholder="Min Tackling"
									formik={formik}
								/>
								<FormikInput
									key="tacklingTo"
									id="tacklingTo"
									name="tacklingTo"
									placeholder="Max Tackling"
									formik={formik}
								/>
							</div>
							<div className={styles.filterBlock}>
								<div>Strength: </div>
								<FormikInput
									key="strengthFrom"
									id="strengthFrom"
									name="strengthFrom"
									placeholder="Min Strength"
									formik={formik}
								/>
								<FormikInput
									key="strengthTo"
									id="strengthTo"
									name="strengthTo"
									placeholder="Max Strength"
									formik={formik}
								/>
							</div>
						</div>
						<Button
							type="submit"
							disabled={!formik.isValid}
							isLoading={isLoading || formik.isSubmitting}
						>
							Search
						</Button>
					</form>
					<div className={styles.cards}>
						{cards.map(l => (
							<CardLot key={l._id} lot={l}>
								<Button onClick={() => onBuy(l._id)} isLoading={isLoading}>
									Buy
								</Button>
							</CardLot>
						))}
					</div>
					{paginationData.total > paginationData.limit && (
						<Pagination
							className={styles.pagination}
							onChange={page => setPaginationData(s => ({ ...s, page }))}
							current={paginationData.page}
							pageSize={paginationData.limit}
							total={paginationData.total}
						/>
					)}
				</div>
			</PaddingContainer>
		</>
	);
};
