import cn from 'classnames';
import { useDrop } from 'react-dnd';

import styles from './PositionMainTableUserTeam.module.scss';
import { ETypeDragTactics } from '../../constants/type-drag-drop';
import { PlayerMainTableUserTeam } from '../PlayerMainTableUserTeam/PlayerMainTableUserTeam';
import { IPositionMainTableUserTeamProps } from './PositionMainTableUserTeam.types';

export function PositionMainTableUserTeam({
	position,
	className,
	...props
}: IPositionMainTableUserTeamProps) {
	const { position: positionName, currentPlayer } = position;

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: [
				ETypeDragTactics.FOOTBALL_FIELD,
				ETypeDragTactics.TABLE_MAIN,
				ETypeDragTactics.TABLE_BENCH,
				ETypeDragTactics.TABLE_RESERVE
			],
			drop: () => ({
				type: ETypeDragTactics.TABLE_MAIN,
				data: position
			}),
			collect: monitor => ({
				isOver: monitor.isOver()
			})
		}),
		[currentPlayer]
	);

	// is Value ?
	const circle = currentPlayer && (
		<PlayerMainTableUserTeam
			className={cn({
				[styles.isOver]: isOver
			})}
			currentPlayer={currentPlayer}
		/>
	);

	return (
		<div className={cn(styles.positionTable, className)} ref={drop} {...props}>
			<div className={styles.position}>{positionName}</div>
			<div className={styles.player}>{circle}</div>
		</div>
	);
}
