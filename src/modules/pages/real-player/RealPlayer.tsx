'use client';

import cn from 'classnames';
import { apiRealPlayers } from '@/api/rest/real-players/real-players';
import { Loader, Ptag, RatingStars } from '@/components';
import { CenterContainer, PaddingContainer } from '@/containers';
import { useAppDispatch } from '@/hooks/redux';
import Image from 'next/image';
import { handleActionErrors } from '@/utils/handle-action-errors';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from './RealPlayer.module.scss';
import { IRealPlayer } from '@/types/football-simulator/real-player';
import { ratingHelper } from '@/utils/ratingPlayer.helper';
import { Profile } from '@/icons/Profile';
import { fieldPositions } from '@/components/football-tactic-fields/constants';
import { pitchSize } from '@/constants';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes.enum';

export const RealPlayer = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [player, setPlayer] = useState<IRealPlayer>();

	useEffect(() => {
		if (id) {
			const getRealPlayer = async () => {
				setIsLoading(true);
				try {
					const { data } = await apiRealPlayers.getRealPlayer(id as string);
					setPlayer(data);
				} catch (e) {
					handleActionErrors({ e, dispatch });
				} finally {
					setIsLoading(false);
				}
			};

			getRealPlayer();
		}
	}, []);

	if (isLoading || !player)
		return (
			<CenterContainer>
				<Loader />
			</CenterContainer>
		);

	return (
		<CenterContainer>
			<PaddingContainer>
				<div className={styles.playerWrapper}>
					<div>
						<div className={styles.playerInfo}>
							<div className={styles.playerPhoto}>
								{player.photo ? (
									<Image
										width={100}
										height={100}
										className={styles.photoPlayer}
										src={player.photo}
										alt=""
									/>
								) : (
									<Profile
										className={styles.photoPlayer}
										width={150}
										height={150}
									/>
								)}
							</div>
							<div className={styles.playerAdditionalInfo}>
								<div>{player.name}</div>
								<div>{player.age} years old</div>
								<div className={styles.countyWrapper}>
									<Image
										width={100}
										height={100}
										className={styles.countryPhoto}
										src={player.country.flag}
										alt=""
									/>
									<div>{player.country.name}</div>
								</div>
								{player.realTeam && (
									<Link
										href={`${ROUTES.REAL_TEAM}/${player.realTeam._id}`}
										className={styles.link}
									>
										<Image
											width={100}
											height={100}
											className={styles.logoClub}
											src={player.realTeam.logoClub}
											alt=""
										/>
										{player.realTeam.clubName}
									</Link>
								)}
							</div>
						</div>
						<div className={styles.ratingBlocks}>
							<div className={styles.ratingWrapper}>
								<div className={styles.skillBlockWrapper}>
									<Ptag className={styles.scorePlayer}>
										Skill: {ratingHelper(player.skills, 100)} (
										{ratingHelper(player.skills, 5)})
									</Ptag>
									<div className={styles.stars}>
										<RatingStars rating={ratingHelper(player.skills, 5)} />
									</div>
								</div>
								<div className={styles.skillsCountWrapper}>
									<div className={styles.skillText}>
										Agility: <div>{player.skills.agility}</div>
									</div>
									<div className={styles.skillText}>
										Jumping: <div>{player.skills.jumping}</div>
									</div>
									<div className={styles.skillText}>
										Passing: <div>{player.skills.passing}</div>
									</div>
									<div className={styles.skillText}>
										Penalty Taking: <div>{player.skills.penalty_taking}</div>
									</div>
									<div className={styles.skillText}>
										Saving: <div>{player.skills.saving}</div>
									</div>
									<div className={styles.skillText}>
										Shooting: <div>{player.skills.shooting}</div>
									</div>
									<div className={styles.skillText}>
										Strength: <div>{player.skills.strength}</div>
									</div>
									<div className={styles.skillText}>
										Tackling: <div>{player.skills.tackling}</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<div>Positions: {player.positions.join(', ').trimEnd()}</div>
						<div
							className={styles.field}
							style={{
								width: pitchSize.pitchWidth / 3,
								height: pitchSize.pitchHeight / 3
							}}
						>
							{fieldPositions.map(d => {
								if (player.positions.includes(d.position))
									return (
										<div
											key={d.position}
											className={cn(styles.position, d.className)}
										>
											<div className={styles.positionText}>{d.position}</div>
										</div>
									);
							})}
						</div>
					</div>
				</div>
			</PaddingContainer>
		</CenterContainer>
	);
};
