import { ArrowSlider } from 'src/components';

import { BlockLayout, SliderLayout, Title } from './../';
import { ILeagueBlockProps } from './leagueBlock.interfaces';
import styles from './leagueBlock.module.scss';

export function LeagueBlock({
	league,
	back,
	next,
	isDisabled
}: ILeagueBlockProps) {
	return (
		<BlockLayout>
			<Title>{league?.name}</Title>

			<SliderLayout>
				<ArrowSlider onClick={back} isDisabled={isDisabled} isFlip />

				<img
					className={styles.leagueImg}
					src={league?.logoLeague}
					alt={league?.name}
					key={league?._id}
				/>

				<ArrowSlider onClick={next} isDisabled={isDisabled} />
			</SliderLayout>
		</BlockLayout>
	);
}
