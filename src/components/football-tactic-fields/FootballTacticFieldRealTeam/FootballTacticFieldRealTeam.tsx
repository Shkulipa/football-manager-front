'use client';

import cn from 'classnames';
import { fieldPositions, sizeFootballFieldCss } from '../constants';
import { IFootballTacticFieldRealTeamProps } from './FootballTacticFieldRealTeam.types';
import styles from './../FootballTacticField.module.scss';
import stylesSecondary from './FootballTacticFieldRealTeam.module.scss';
import { RatingStars } from '@/components';

export const FootballTacticFieldRealTeam = ({
	positions
}: IFootballTacticFieldRealTeamProps): JSX.Element => {
	return (
		<div
			className={styles.field}
			style={{
				...sizeFootballFieldCss
			}}
		>
			{fieldPositions.map(d => {
				const value = positions[d.position];
				if (value)
					return (
						<div
							key={d.position}
							className={cn(stylesSecondary.position, d.className)}
						>
							<div className={stylesSecondary.name}>{value.name}</div>
							<RatingStars
								className={stylesSecondary.rating}
								rating={value.rating}
								size={12}
							/>
							<div className={stylesSecondary.content}>{value.number}</div>
						</div>
					);
			})}
		</div>
	);
};
