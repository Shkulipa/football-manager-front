import Image from 'next/image';
import { TextBlock } from '../../TextBlock';
import styles from './Team.module.scss';
import { ITeamProps } from './Team.types';
import { TeamRating } from '@/components';

export function Team({ img, text, skills }: ITeamProps): JSX.Element {
	return (
		<>
			<Image className={styles.img} width={100} height={100} src={img} alt="" />
			<TextBlock>{text}</TextBlock>
			<TeamRating skills={skills} />
		</>
	);
}
