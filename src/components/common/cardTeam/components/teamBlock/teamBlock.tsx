import { ArrowSlider, RatingStars } from 'src/components';

import { BlockLayout, SliderLayout, Title } from './../';
import { ITeamBlockProps } from './teamBlock.interfaces';
import styles from './teamBlock.module.scss';

export function TeamBlock({
	team,
	skillteam,
	back,
	next,
	isDisabled
}: ITeamBlockProps) {
	return (
		<BlockLayout>
			<SliderLayout>
				<ArrowSlider onClick={back} isDisabled={isDisabled} isFlip />

				<div className={styles.team}>
					<Title>{team?.clubName}</Title>

					<img
						className={styles.teamImg}
						src={team?.logoClub}
						alt={team?.clubName}
						key={team?._id}
					/>

					<RatingStars rating={skillteam} />

					<div className={styles.skills}>
						<div className={styles.skill}>
							<div className={styles.skillName}>ATT</div>
							<div className={styles.skillValue}>{team?.skills.att}</div>
						</div>
						<div className={styles.skill}>
							<div className={styles.skillName}>MID</div>
							<div className={styles.skillValue}>{team?.skills.mid}</div>
						</div>
						<div className={styles.skill}>
							<div className={styles.skillName}>DEF</div>
							<div className={styles.skillValue}>{team?.skills.def}</div>
						</div>
					</div>
				</div>

				<ArrowSlider onClick={next} isDisabled={isDisabled} />
			</SliderLayout>
		</BlockLayout>
	);
}
