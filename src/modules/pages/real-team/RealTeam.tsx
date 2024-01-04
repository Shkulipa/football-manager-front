'use client';

import { getRealTeam } from '@/api/rest/teams/teams';
import {
	FootballTacticFieldRealTeam,
	Loader,
	TeamRating,
	Htag,
	PlayersTable,
	RatingStars
} from '@/components';
import { CenterContainer, PaddingContainer } from '@/containers';
import { useAppDispatch } from '@/hooks/redux';
import { FieldLayout } from '@/layouts/tactic/FieldLayout';
import { PlayersLayout } from '@/layouts/tactic/PlayersLayout';
import { TacticLayout } from '@/layouts/tactic/TacticLayout';
import { IRealTeamFullInfo } from '@/types/football-simulator/real-team-full-info';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './RealTeam.module.scss';
import Image from 'next/image';

import { PlayerTableRealTeam } from '@/components/items-tactic-table/real-team/components/PlayerTableRealTeam';
import { TableTitlesMemo } from '../user-team/modules/own-user-team/components/TableTitles/TableTitles';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes.enum';

export const RealTeam = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [team, setTeam] = useState<IRealTeamFullInfo>();

	useEffect(() => {
		if (id) {
			const getRealPlayer = async () => {
				setIsLoading(true);
				try {
					const { data } = await getRealTeam(id as string);
					setTeam(data);
				} catch (e) {
					handleActionErrors({ e, dispatch });
				} finally {
					setIsLoading(false);
				}
			};

			getRealPlayer();
		}
	}, []);

	if (isLoading || !team)
		return (
			<CenterContainer>
				<Loader />
			</CenterContainer>
		);

	return (
		<PaddingContainer>
			<TacticLayout>
				<FieldLayout>
					<FootballTacticFieldRealTeam positions={team.main} />
				</FieldLayout>

				<PlayersLayout>
					<div className={styles.clubInfoWrapper}>
						<Image
							className={styles.logoClub}
							width={200}
							height={200}
							src={team.logoClub}
							alt=""
						/>

						<div>
							<Htag tag="h3" className={styles.clubName}>
								{team.clubName}
							</Htag>
							<TeamRating skills={team.skills} />
						</div>
					</div>

					<div className={styles.league}>
						<Image
							className={styles.logoClub}
							width={200}
							height={200}
							src={team.league.logoLeague}
							alt=""
						/>

						<Htag tag="h3">{team.league.name}</Htag>
					</div>

					<PlayersTable title="Main Squad">
						<TableTitlesMemo />
						{Object.entries(team.main).map(([key, value]) => {
							return (
								<PlayerTableRealTeam key={key}>
									<div className={styles.positionName}>{key}</div>
									<div>{value.number}</div>
									<div className={styles.playerNameWrapper}>
										<Link
											href={`${ROUTES.REAL_PLAYER}/${value._id}`}
											className={styles.playerName}
										>
											{value.name}
										</Link>
										<RatingStars
											className={styles.rating}
											rating={value.rating}
											size={16}
										/>
									</div>
								</PlayerTableRealTeam>
							);
						})}
					</PlayersTable>

					<PlayersTable title="Bench Squad">
						{team.bench.map(value => {
							return (
								<PlayerTableRealTeam key={value._id}>
									<div />
									<div>{value.number}</div>
									<div className={styles.playerNameWrapper}>
										<Link
											href={`${ROUTES.REAL_PLAYER}/${value._id}`}
											className={styles.playerName}
										>
											{value.name}
										</Link>
										<RatingStars
											className={styles.rating}
											rating={value.rating}
											size={16}
										/>
									</div>
								</PlayerTableRealTeam>
							);
						})}
					</PlayersTable>
				</PlayersLayout>
			</TacticLayout>
		</PaddingContainer>
	);
};
