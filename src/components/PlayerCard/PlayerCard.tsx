import cn from 'classnames';
import Image from 'next/image';
import { IPlayerCardProps } from './PlayerCard.types';
import styles from './PlayerCard.module.scss';
import { ratingHelper } from '@/utils/ratingPlayer.helper';
import { Ptag, RatingStars } from '@/components';
import { Profile } from '@/icons/Profile';

export const PlayerCard = ({
	player,
	className,
	...props
}: IPlayerCardProps): JSX.Element => {
	return (
		<div className={cn(styles.playerCardWrapper, className)} {...props}>
			<div className={styles.upBlock}>
				<div className={styles.playerInfoBlock}>
					<div className={styles.scorePlayer}>
						Skill: {ratingHelper(player.skills, 100)}
					</div>
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
				<div className={styles.scorePlayer}>{player.name}</div>
				<hr />
				<div className={styles.scorePlayer}>
					{player.positions.join(', ').trimEnd()}
				</div>
				<hr />
				<div className={styles.skillBlockWrapper}>
					<Ptag className={styles.scorePlayer}>
						Skill: {ratingHelper(player.skills, 100)} (
						{ratingHelper(player.skills, 5)})
					</Ptag>
					<div className={styles.stars}>
						<RatingStars rating={ratingHelper(player.skills, 5)} />
					</div>
				</div>
				<div className={styles.skillNumber}>
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
	);
};
