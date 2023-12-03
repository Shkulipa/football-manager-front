import Image from 'next/image';
import { ITeamInfoProps } from './TeamInfo.types';
import { Ptag } from '@/components';
import styles from './TeamInfo.module.scss';

export const TeamInfo = ({ team }: ITeamInfoProps): JSX.Element => {
	return (
		<div className={styles.teamInfo}>
			<Ptag className={styles.textItem}>{team.rank}.</Ptag>
			<Ptag className={styles.textItem}>{team.ratingElo}</Ptag>
			<div className={styles.clubName}>
				{team.logoClub && (
					<Image
						priority={true}
						className={styles.imgTeam}
						width={100}
						height={100}
						src={team.logoClub}
						alt=""
					/>
				)}
				<Ptag className={styles.textItem}>{team.clubName}</Ptag>
			</div>
		</div>
	);
};
