import cn from 'classnames';
import styles from './FootballTacticField.module.scss';
import { EPlayerPositionName } from '@/constants/footballsimulationengine/player-position-name.enum';
import { pitchSize } from '@/constants';

interface IPositionsFieldProps {
	className: string;
	position: EPlayerPositionName;
}

export const fieldPositions: IPositionsFieldProps[] = [
	/* attackers */
	{
		className: cn(styles.st, styles.lcf),
		position: EPlayerPositionName.LCF
	},
	{
		className: cn(styles.st),
		position: EPlayerPositionName.ST
	},
	{
		className: cn(styles.st, styles.rcf),
		position: EPlayerPositionName.RCF
	},

	/* attackers midfielders */
	{
		className: cn(styles.am, styles.lwm),
		position: EPlayerPositionName.LWM
	},
	{
		className: cn(styles.am, styles.aml),
		position: EPlayerPositionName.AML
	},
	{
		className: cn(styles.am),
		position: EPlayerPositionName.AMC
	},
	{
		className: cn(styles.am, styles.amr),
		position: EPlayerPositionName.AMR
	},
	{
		className: cn(styles.am, styles.rwm),
		position: EPlayerPositionName.RWM
	},

	/* midfielders */
	{
		className: cn(styles.cm, styles.lm),
		position: EPlayerPositionName.LM
	},
	{
		className: cn(styles.cm, styles.lcm),
		position: EPlayerPositionName.LCM
	},
	{
		className: cn(styles.cm),
		position: EPlayerPositionName.CM
	},
	{
		className: cn(styles.cm, styles.rcm),
		position: EPlayerPositionName.RCM
	},
	{
		className: cn(styles.cm, styles.rm),
		position: EPlayerPositionName.RM
	},

	/* between midfielders & defenders */
	{
		className: cn(styles.dm, styles.lwb),
		position: EPlayerPositionName.LWB
	},
	{
		className: cn(styles.dm, styles.ldm),
		position: EPlayerPositionName.LDM
	},
	{
		className: cn(styles.dm),
		position: EPlayerPositionName.CDM
	},
	{
		className: cn(styles.dm, styles.rdm),
		position: EPlayerPositionName.RDM
	},
	{
		className: cn(styles.dm, styles.rwb),
		position: EPlayerPositionName.RWB
	},

	/* defenders */
	{
		className: cn(styles.cb, styles.lb),
		position: EPlayerPositionName.LB
	},
	{
		className: cn(styles.cb, styles.lcb),
		position: EPlayerPositionName.LCB
	},
	{
		className: cn(styles.cb),
		position: EPlayerPositionName.CB
	},
	{
		className: cn(styles.cb, styles.rcb),
		position: EPlayerPositionName.RCB
	},
	{
		className: cn(styles.cb, styles.rb),
		position: EPlayerPositionName.RB
	},

	/* goalkeeper */
	{
		className: cn(styles.gk, {
			[styles.gkAdvanced]: false,
			[styles.gkDrawn]: false
		}),
		position: EPlayerPositionName.GK
	}
];

export const sizeFootballFieldCss = {
	width: pitchSize.pitchWidth / 1.47,
	height: pitchSize.pitchHeight / 1.47
};

export const step = 30;
