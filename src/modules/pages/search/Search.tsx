'use client';

import { useState } from 'react';
import { IFormikSearch } from './Search.types';
import { PaddingContainer } from '@/containers';
import { Button, FormikInput } from '@/components';
import styles from './Search.module.scss';
import { searchValidation } from './validations/search.validation';
import { useFormik } from 'formik';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { useAppDispatch } from '@/hooks/redux';
import { apiRealPlayers } from '@/api/rest/real-players/real-players';
import { IRealPlayer } from '@/types/football-simulator/real-player';
import Pagination from 'rc-pagination';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes.enum';
import { getRealTeams } from '@/api/rest/teams/teams';
import { IRealTeamFullInfo } from '@/types/football-simulator/real-team-full-info';

const initialValues: IFormikSearch = {
	type: 'player',
	search: ''
};

export const Search = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [players, setPlayers] = useState<IRealPlayer[]>([]);
	const [realTeams, setRealTeams] = useState<IRealTeamFullInfo[]>([]);
	const [paginationData, setPaginationData] = useState({
		page: 1,
		total: 0,
		limit: 25
	});

	const onPlayer = (id: string) => {
		router.push(ROUTES.REAL_PLAYER + `/${id}`);
	};
	const onRealTeam = (id: string) => {
		router.push(ROUTES.REAL_TEAM + `/${id}`);
	};

	const formik = useFormik<IFormikSearch>({
		initialValues,
		validationSchema: searchValidation,
		onSubmit: async (values, formik) => {
			const req = {
				search: values.search || '',
				...paginationData
			};
			try {
				if (values.type === 'player') {
					const { data } = await apiRealPlayers.getRealPlayers(req);
					setPaginationData(s => ({ ...s, total: data.count }));
					setPlayers(data.items);
					setRealTeams([]);
				}

				if (values.type === 'real-team') {
					const { data } = await getRealTeams({
						clubName: values.search || '',
						...req
					});
					setPaginationData(s => ({ ...s, total: data.count }));
					setPlayers([]);
					setRealTeams(data.items);
				}
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

	return (
		<PaddingContainer>
			<form
				onSubmit={formik.handleSubmit}
				autoComplete="off"
				className={styles.controlPanel}
			>
				<div className={styles.inputWrapper}>
					<FormikInput
						key="search"
						id="search"
						name="search"
						placeholder="Name"
						formik={formik}
					/>
				</div>
				<select
					id="type"
					name="type"
					value={formik.values.type}
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
				>
					<option key={'player'} value={'player'}>
						Player
					</option>
					<option key={'real-team'} value={'real-team'}>
						Real Team
					</option>
				</select>
				<Button
					type="submit"
					disabled={!formik.isValid}
					isLoading={formik.isSubmitting}
				>
					Search
				</Button>
			</form>

			<div className={styles.data}>
				{players.map(p => (
					<div
						className={styles.dataItem}
						key={p._id}
						onClick={() => onPlayer(p._id)}
					>
						{p.name}
					</div>
				))}
				{realTeams.map(t => (
					<div
						className={styles.dataItem}
						key={t._id}
						onClick={() => onRealTeam(t._id)}
					>
						{t.clubName}
					</div>
				))}

				{paginationData.total > paginationData.limit && (
					<Pagination
						className={styles.pagination}
						onChange={page => {
							setPaginationData(s => ({ ...s, page }));
							formik.submitForm();
						}}
						current={paginationData.page}
						pageSize={paginationData.limit}
						total={paginationData.total}
					/>
				)}
			</div>
		</PaddingContainer>
	);
};
