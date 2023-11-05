import {
	Button,
	ErrorNotification,
	FootballTacticFieldUserTeam,
	FormikInput,
	Htag,
	PlayersTable,
	Ptag,
	TeamRating
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useFormik } from 'formik';
import {
	initPositionsHOSTS,
	orderedPositions
} from '../../../../components/items-tactic-table/constants/init-positions';
import { useEffect, useMemo, useState } from 'react';
import { withReactDnd } from '@/providers/ReactDnd/ReactDnd.hoc';
import { FieldLayout } from '@/layouts/common/tactic/FieldLayout';
import { PlayersLayout } from '@/layouts/common/tactic/PlayersLayout';
import { TacticLayout } from '@/layouts/common/tactic/TacticLayout';

import { PositionBenchRegion } from '@/components/items-tactic-table/user-team/positions/PositionBenchRegion';
import { PositionReserveRegion } from '@/components/items-tactic-table/user-team/positions/PositionReserveRegion';
import { TPositionTacticPositionsUserTeam } from '@/components/football-tactic-fields/FootballTacticFieldUserTeam/FootballTacticFieldUserTeam.types';
import { PositionMainTable } from '@/components/items-tactic-table/user-team/positions/PositionMainTable/PositionMainTable';
import { IPosition } from '@/components/items-tactic-table/user-team/types/position-user-team';
import { TableTitlesMemo } from './components/TableTitles/TableTitles';
import { limitBenchPlayers } from '@/constants';
import { useFileUpload } from '@/hooks/useFileUpload';
import { ImgInput } from '@/components/ImgInput/ImgInput';
import styles from './OwnUserTeam.module.scss';
import { IOwnUserTeamInitialValues } from './OwnUserTeam.types';
import { OwnUserTeamValidation } from './OwnUserTeam.validation';
import { CardContentModal } from '@/components/CardContentModal';
import { GlobalModal } from '@/components/GlobalModal/GlobalModal';
import { PaddingContainer } from '@/containers';
import { reset, setInitVersionTeam, setStep } from '../store/userTeam.slice';
import { isEqualSquad } from './utils/is-equal-squad';
import { parseUpdateUserTeamDataReq } from './utils/parse-update-user-team-data-req';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { apiUserTeam } from '@/api/rest/user-team/apiUserTeam';
import { truncateMiddle } from '@/utils/truncate-middle';
import { ActionsModal } from '@/components/ActionsModal';

const OwnUserTeamComponent = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { initVersionTeam, secondVersionTeam } = useAppSelector(
		s => s.userTeamReducer
	);
	const [positions, setPositions] = useState<TPositionTacticPositionsUserTeam>(
		initPositionsHOSTS as TPositionTacticPositionsUserTeam
	);
	const [isShowConfirmDeleteTeam, setShowConfirmDeleteTeam] = useState(false);
	const [isEditClubName, setIsEditClubName] = useState(false);
	const [isUpdatedSuccess, setIsUpdatedSuccess] = useState(false);
	const [errorDeleting, setErrorDeleting] = useState('');

	const formik = useFormik<IOwnUserTeamInitialValues>({
		initialValues: {
			clubName: secondVersionTeam?.clubName || '',
			userTeamImgField: null
		},
		validationSchema: OwnUserTeamValidation,
		onSubmit: async (values, formik) => {
			if (!secondVersionTeam || !initVersionTeam) return;
			const { main, bench, reserve } =
				parseUpdateUserTeamDataReq(secondVersionTeam);

			const formData = new FormData();
			if (values.userTeamImgField)
				formData.append('userTeamImgField', values.userTeamImgField);
			formData.append('clubName', values.clubName);
			formData.append('main', JSON.stringify(main));
			formData.append('bench', JSON.stringify(bench));
			formData.append('reserve', JSON.stringify(reserve));

			try {
				await apiUserTeam.updateTeam(initVersionTeam._id, formData);
				dispatch(setInitVersionTeam(secondVersionTeam));
				setIsUpdatedSuccess(true);
				setTimeout(() => setIsUpdatedSuccess(false), 5000);
			} catch (e) {
				handleActionErrors({ e, dispatch, formik });
			} finally {
				formik?.setSubmitting(false);
			}
		}
	});

	const [isUpdatedLogo, setIsUpdatedLogo] = useState(false);
	const { preview, inputRef, onChange, setPreview } = useFileUpload({
		isPreview: true,
		onCustomChange: file => {
			formik.setFieldValue('userTeamImgField', file);
			setIsUpdatedLogo(true);
		}
	});

	/**
	 * @info
	 * update squad after drag & drop players
	 */
	useEffect(() => {
		if (secondVersionTeam?.main) {
			const playerPositionData = Object.entries(secondVersionTeam.main);

			const updatedPositionsArr = Object.entries(positions).map(p => {
				const namePosition = p[0];
				const position = p[1];
				const value: IPosition = {
					...position,
					player: null
				};

				// check if player for this position
				const isTakenPosition = playerPositionData.find(
					pl => pl[0] === namePosition
				);
				if (isTakenPosition) value.player = isTakenPosition[1];

				return [namePosition, value];
			});
			const updatedPositions = Object.fromEntries(updatedPositionsArr);

			setPositions(updatedPositions);
		}
	}, [secondVersionTeam]);

	/**
	 * @info
	 * update logo
	 */
	useEffect(() => {
		if (secondVersionTeam?.logoClub) {
			setPreview(secondVersionTeam.logoClub);
		}
	}, [secondVersionTeam?.logoClub]);

	/**
	 * @info
	 * view table with players from "Main squad"
	 */
	const positionsInArr = Object.values(positions);
	const positionTaken = positionsInArr
		.filter(val => val.player)
		.sort(function (a: IPosition, b: IPosition) {
			return (
				orderedPositions.indexOf(a.position) -
				orderedPositions.indexOf(b.position)
			);
		});
	const mainPlayers = positionTaken.map((position, index) => (
		<PositionMainTable key={index} position={position} />
	));

	/**
	 * @info
	 * checking updating, for disabling button "update"
	 */
	const isEqualSquads = useMemo(() => {
		if (initVersionTeam && secondVersionTeam)
			return isEqualSquad(initVersionTeam, secondVersionTeam);

		return false;
	}, [secondVersionTeam, initVersionTeam]);
	const isEqualClubName =
		initVersionTeam?.clubName === formik.values['clubName'];
	const isEqual = isEqualSquads && !isUpdatedLogo && isEqualClubName;

	if (!secondVersionTeam || !initVersionTeam) return <></>;

	/**
	 * @info
	 * action handlers
	 */
	const onReset = () => {
		dispatch(reset());
		setPreview(secondVersionTeam.logoClub);
		setIsUpdatedLogo(false);
		formik.setFieldValue('clubName', initVersionTeam.clubName);
	};
	const onDelete = () => setShowConfirmDeleteTeam(true);
	const onCloseConfirmDeleteTeam = () => setShowConfirmDeleteTeam(false);
	const onEditClubName = () => setIsEditClubName(s => !s);

	const onConfirmDelete = async () => {
		try {
			await apiUserTeam.deleteTeam(initVersionTeam._id);
			dispatch(reset());
			dispatch(setStep('success-deleted-team'));
		} catch (e) {
			handleActionErrors({
				e,
				dispatch,
				additionalConditions(status, data) {
					setErrorDeleting(data.message);
					return true;
				}
			});
		}
	};

	// error from server
	const errorFromServer = typeof formik.errors === 'string' && (
		<ErrorNotification message={formik.errors} />
	);
	const errorFromServerDeleting = errorDeleting && (
		<ErrorNotification message={errorDeleting} />
	);

	const disabledBtn = isEqual || formik.isSubmitting || isEditClubName;

	return (
		<>
			<GlobalModal
				isShow={isShowConfirmDeleteTeam}
				callbackClose={onCloseConfirmDeleteTeam}
			>
				<CardContentModal
					title={'Confirm Team Deletion'}
					description={
						'Are you sure you want to delete this team? This action cannot be undone. Please confirm your choice.'
					}
					callbackClose={onCloseConfirmDeleteTeam}
				/>
				<ActionsModal
					onConfirm={onConfirmDelete}
					onCancel={onCloseConfirmDeleteTeam}
				/>
			</GlobalModal>
			<PaddingContainer>
				<form onSubmit={formik.handleSubmit} autoComplete="off">
					<TacticLayout>
						<FieldLayout>
							<FootballTacticFieldUserTeam positions={positions} />

							<div className={styles.actions}>
								<Button type="button" onClick={onReset} disabled={disabledBtn}>
									Reset Changes
								</Button>
								<Button type="submit" disabled={disabledBtn}>
									{formik.isSubmitting ? 'Loading...' : 'Update Team'}
								</Button>
								<Button
									type="button"
									onClick={onDelete}
									disabled={formik.isSubmitting}
								>
									Delete Team
								</Button>
							</div>
							{isUpdatedSuccess && <Ptag>Success Updated!</Ptag>}
							{errorFromServer}
							{errorFromServerDeleting}
						</FieldLayout>

						<PlayersLayout>
							<div className={styles.clubInfoWrapper}>
								<ImgInput
									inputRef={inputRef}
									preview={preview || ''}
									labelInput="Logo Club"
									onChange={onChange}
								/>

								<div className={styles.clubInfo}>
									<div className={styles.editClubNameWrapper}>
										<div className={styles.clubNameWrapper}>
											{isEditClubName ? (
												<FormikInput
													key="clubName"
													id="clubName"
													name="clubName"
													placeholder="Team name..."
													formik={formik}
												/>
											) : (
												<Htag tag="h3">
													{truncateMiddle({
														text: formik.values['clubName'],
														maxLength: 18,
														leftChars: 3,
														rightChars: 1
													})}
												</Htag>
											)}
										</div>
										<Button
											type="button"
											onClick={onEditClubName}
											disabled={
												formik.isSubmitting || Boolean(formik.errors.clubName)
											}
										>
											{isEditClubName ? 'Save' : 'Edit'}
										</Button>
									</div>
									<TeamRating skills={secondVersionTeam.skills} />
								</div>
							</div>

							<PlayersTable title="Main Squad">
								<TableTitlesMemo />
								{mainPlayers}
							</PlayersTable>
							<PlayersTable
								title={`Bench squad ${secondVersionTeam.bench.length} / ${limitBenchPlayers}`}
							>
								<PositionBenchRegion players={secondVersionTeam.bench} />
							</PlayersTable>

							<PlayersTable title="Reserve Squad">
								<PositionReserveRegion players={secondVersionTeam.reserve} />
							</PlayersTable>
						</PlayersLayout>
					</TacticLayout>
				</form>
			</PaddingContainer>
		</>
	);
};

export const OwnUserTeam = withReactDnd(OwnUserTeamComponent);
