import { Ptag } from '@/components';
import styles from './TitleClub.module.scss';
import React from 'react';

export const TitleClub = (): JSX.Element => {
	return (
		<div className={styles.title}>
			<Ptag className={styles.textItem}>Rank</Ptag>
			<Ptag className={styles.textItem}>Rating Elo</Ptag>
			<Ptag className={styles.textItem}>Club</Ptag>
		</div>
	);
};

export const TitleClubMemo = React.memo(TitleClub);
