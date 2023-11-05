'use client';

import { fieldPositions, sizeFootballFieldCss } from '../constants';
import styles from './../FootballTacticField.module.scss';
import { PositionField } from '@/components/items-tactic-table/single-match/positions/PositionField/PositionField';
import { IFootballTacticFieldSingleMatchProps } from './FootballTacticFieldSingleMatch.types';

export const FootballTacticFieldSingleMatch = ({
	positions
}: IFootballTacticFieldSingleMatchProps): JSX.Element => {
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
