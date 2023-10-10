import cn from 'classnames';
import { ISkillProps } from './Skill.types';
import styles from './Skill.module.scss';
import { Ptag } from '@/components';

export default function Skill({ name, value }: ISkillProps): JSX.Element {
	return (
		<div className={styles.skill}>
			<Ptag size="m" className={cn(styles.skillText, styles.skillName)}>
				{name}
			</Ptag>
			<Ptag size="m" className={cn(styles.skillText)}>
				{value}
			</Ptag>
		</div>
	);
}
