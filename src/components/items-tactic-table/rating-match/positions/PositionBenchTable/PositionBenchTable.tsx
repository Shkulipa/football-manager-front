import cn from 'classnames';
import { useDrop } from 'react-dnd';

import { IPositionBenchTableProps } from './PositionBenchTable.types';
import styles from './PositionBenchTable.module.scss';
import { ETypeDragTactics } from '../../../constants/type-drag-drop';
import { PlayerBenchTable } from '../../players/PlayerBenchTable/PlayerBenchTable';
import { useAppSelector } from '@/hooks/redux';

/**
 * @info
 * using in bench table of "rating match" page
 */
export function PositionBenchTable({
	player,
	className,
	...props
}: IPositionBenchTableProps) {
	const { secondUserTeamVersion } = useAppSelector(s => s.ratingMatchReducer);

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: [
				ETypeDragTactics.FOOTBALL_FIELD,
				ETypeDragTactics.TABLE_MAIN,
				ETypeDragTactics.TABLE_BENCH
			],
			drop: () => ({
				type: ETypeDragTactics.TABLE_BENCH,
				data: player
			}),
			canDrop: () => {
				if (!secondUserTeamVersion) return false;
				/**
				 * protect from replace players that was changed yet
				 */
				const isChanged = secondUserTeamVersion.replacements.find(
					r => r.off === player._id
				);
				if (isChanged) return false;

				return true;
			},
			collect: monitor => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop()
			})
		}),
		[player]
	);

	// is Value ?
	const circle = player && (
		<PlayerBenchTable
			className={cn({
				[styles.isOver]: isOver && canDrop
			})}
			player={player}
		/>
	);

	return (
		<div
			className={cn(styles.positionTable, className)}
			ref={canDrop ? drop : undefined}
			{...props}
		>
			{circle}
		</div>
	);
}
