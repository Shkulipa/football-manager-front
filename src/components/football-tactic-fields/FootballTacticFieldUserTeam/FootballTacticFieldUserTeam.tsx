'use client';

import { fieldPositions, sizeFootballFieldCss } from '../constants';
import { IFootballTacticFieldUserTeamProps } from './FootballTacticFieldUserTeam.types';
import styles from './../FootballTacticField.module.scss';
import { PositionField } from '@/components/items-tactic-table/user-team/positions/PositionField/PositionField';

export const FootballTacticFieldUserTeam = ({
	positions
}: IFootballTacticFieldUserTeamProps): JSX.Element => {
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
