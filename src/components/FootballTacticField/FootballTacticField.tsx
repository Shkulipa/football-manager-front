'use client';

import cn from 'classnames';
import { pitchSize } from '@/constants';
import {
	EFootballFieldsType,
	IFootballTacticFieldProps,
	TPositionTacticPositionsMatch,
	TPositionTacticPositionsPrepare
} from './FootballTacticField.types';
import styles from './FootballTacticField.module.scss';
import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import { PositionField } from '../items-tactic-table';
import { PositionFieldPrepare } from '../items-tactic-table/items/PositionFieldPrepare/PositionFieldPrepare';

export const FootballTacticField = ({
	positions,
	typeField
}: IFootballTacticFieldProps): JSX.Element => {
	let PositionComponent;
	switch (typeField) {
		case EFootballFieldsType.MATCH:
			positions = positions as TPositionTacticPositionsMatch;
			PositionComponent = PositionField;
			break;
		case EFootballFieldsType.PREPARE:
			positions = positions as TPositionTacticPositionsPrepare;
			PositionComponent = PositionFieldPrepare;
			break;
		default:
			positions = positions as TPositionTacticPositionsMatch;
			PositionComponent = PositionField;
	}

	return (
		<div
			className={styles.field}
			style={{
				width: pitchSize.pitchWidth / 1.47,
				height: pitchSize.pitchHeight / 1.47
			}}
		>
			{/* attackers */}
			<PositionComponent
				className={cn(styles.st, styles.lcf)}
				position={positions[EPlayerPositionName.LCF]}
			/>
			<PositionComponent
				className={cn(styles.st)}
				position={positions[EPlayerPositionName.ST]}
			/>
			<PositionComponent
				className={cn(styles.st, styles.rcf)}
				position={positions[EPlayerPositionName.RCF]}
			/>

			{/* attackers midfielders */}
			<PositionComponent
				className={cn(styles.am, styles.lwm)}
				position={positions[EPlayerPositionName.LWM]}
			/>
			<PositionComponent
				className={cn(styles.am, styles.aml)}
				position={positions[EPlayerPositionName.AML]}
			/>
			<PositionComponent
				className={cn(styles.am)}
				position={positions[EPlayerPositionName.AMC]}
			/>
			<PositionComponent
				className={cn(styles.am, styles.amr)}
				position={positions[EPlayerPositionName.AMR]}
			/>
			<PositionComponent
				className={cn(styles.am, styles.rwm)}
				position={positions[EPlayerPositionName.RWM]}
			/>

			{/* midfielders */}
			<PositionComponent
				className={cn(styles.cm, styles.lm)}
				position={positions[EPlayerPositionName.LM]}
			/>
			<PositionComponent
				className={cn(styles.cm, styles.lcm)}
				position={positions[EPlayerPositionName.LCM]}
			/>
			<PositionComponent
				className={cn(styles.cm)}
				position={positions[EPlayerPositionName.CM]}
			/>
			<PositionComponent
				className={cn(styles.cm, styles.rcm)}
				position={positions[EPlayerPositionName.RCM]}
			/>
			<PositionComponent
				className={cn(styles.cm, styles.rm)}
				position={positions[EPlayerPositionName.RM]}
			/>

			{/* between midfielders & deffenders */}
			<PositionComponent
				className={cn(styles.dm, styles.lwb)}
				position={positions[EPlayerPositionName.LWB]}
			/>
			<PositionComponent
				className={cn(styles.dm, styles.ldm)}
				position={positions[EPlayerPositionName.LDM]}
			/>
			<PositionComponent
				className={cn(styles.dm)}
				position={positions[EPlayerPositionName.CDM]}
			/>
			<PositionComponent
				className={cn(styles.dm, styles.rdm)}
				position={positions[EPlayerPositionName.RDM]}
			/>
			<PositionComponent
				className={cn(styles.dm, styles.rwb)}
				position={positions[EPlayerPositionName.RWB]}
			/>

			{/* defenders */}
			<PositionComponent
				className={cn(styles.cb, styles.lb)}
				position={positions[EPlayerPositionName.LB]}
			/>
			<PositionComponent
				className={cn(styles.cb, styles.lcb)}
				position={positions[EPlayerPositionName.LCB]}
			/>
			<PositionComponent
				className={cn(styles.cb)}
				position={positions[EPlayerPositionName.CB]}
			/>
			<PositionComponent
				className={cn(styles.cb, styles.rcb)}
				position={positions[EPlayerPositionName.RCB]}
			/>
			<PositionComponent
				className={cn(styles.cb, styles.rb)}
				position={positions[EPlayerPositionName.RB]}
			/>

			{/* goalkeeper */}
			<PositionComponent
				className={cn(styles.gk, {
					[styles.gkAdvanced]: false,
					[styles.gkDrawn]: false
				})}
				position={positions[EPlayerPositionName.GK]}
			/>
		</div>
	);
};
