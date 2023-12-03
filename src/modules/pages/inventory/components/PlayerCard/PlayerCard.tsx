import Image from 'next/image';
import { IPlayerCardProps } from './PlayerCard.types';
import styles from './PlayerCard.module.scss';
import { ratingHelper } from '@/utils/ratingPlayer.helper';
import { Ptag, RatingStars } from '@/components';
import { Profile } from '@/icons/Profile';

export const PlayerCard = ({ player }: IPlayerCardProps): JSX.Element => {
	return (
		<div className={styles.playerCardWrapper}>
			<div className={styles.upBlock}>
				<div className={styles.playerInfoBlock}>
					<Ptag className={styles.scorePlayer}>
						Skill: {ratingHelper(player.skills, 100)}
					</Ptag>
					<Image
						width={100}
						height={100}
						className={styles.photoBlock}
						src={player.country.flag}
						alt=""
					/>
					<Image
						width={100}
						height={100}
						className={styles.photoBlock}
						src={player.realTeam.logoClub}
						alt=""
					/>
				</div>
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
						<Profile className={styles.photoPlayer} width={150} height={150} />
					)}
				</div>
			</div>

			<div>
				<Ptag size="l" className={styles.scorePlayer}>
					{player.name}
				</Ptag>
				<hr />
				<Ptag size="l" className={styles.scorePlayer}>
					{player.positions.join(', ').trimEnd()}
				</Ptag>
				<hr />
				<div className={styles.skillBlockWrapper}>
					<Ptag className={styles.scorePlayer}>
						Skill: {ratingHelper(player.skills, 100)}
					</Ptag>
					<div className={styles.stars}>
						<RatingStars rating={ratingHelper(player.skills, 5)} />
					</div>
				</div>
				<div className={styles.skillNumber}>
					<Ptag className={styles.skillText}>
						Agility: <div>{player.skills.agility}</div>
					</Ptag>
					<Ptag className={styles.skillText}>
						Jumping: <div>{player.skills.jumping}</div>
					</Ptag>
					<Ptag className={styles.skillText}>
						Passing: <div>{player.skills.passing}</div>
					</Ptag>
					<Ptag className={styles.skillText}>
						Penalty Taking: <div>{player.skills.penalty_taking}</div>
					</Ptag>
					<Ptag className={styles.skillText}>
						Saving: <div>{player.skills.saving}</div>
					</Ptag>
					<Ptag className={styles.skillText}>
						Shooting: <div>{player.skills.shooting}</div>
					</Ptag>
					<Ptag className={styles.skillText}>
						Strength: <div>{player.skills.strength}</div>
					</Ptag>
					<Ptag className={styles.skillText}>
						Tackling: <div>{player.skills.tackling}</div>
					</Ptag>
				</div>
			</div>
		</div>
	);
};
