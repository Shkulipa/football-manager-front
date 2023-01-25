import cn from 'classnames';
import { useDrop } from 'react-dnd';

import { IPositionProps } from './position.interfaces';
import styles from './position.module.scss';

enum EAccept {
	PLAYER = 'PLAYER'
}

export function Position({
	positionData,
	className,
	...props
}: IPositionProps) {
	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: 'PLAYER',
			drop: () => {
				// console.log('droped: ', positionData);
				return positionData;
			},
			collect: monitor => ({
				isOver: monitor.isOver()
			})
		}),
		[positionData]
	);

	return (
		<div className={cn(styles.position, className)} ref={drop} {...props} />
	);
}
