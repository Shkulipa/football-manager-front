'use client';

import { fieldPositions, sizeFootballFieldCss } from '../constants';
import { IFootballTacticFieldRatingMatchProps } from './FootballTacticFieldRatingMatch.types';
import styles from './../FootballTacticField.module.scss';
import { PositionField } from '@/components/items-tactic-table/rating-match/positions/PositionField/PositionField';

export const FootballTacticFieldRatingMatch = ({
	positions
}: IFootballTacticFieldRatingMatchProps): JSX.Element => {
	return (
		<div
			className={styles.field}
			style={{
				...sizeFootballFieldCss
			}}
		>
			{fieldPositions.map(d => (
				<PositionField
					key={d.position}
					className={d.className}
					position={positions[d.position]}
				/>
			))}
		</div>
	);
};
