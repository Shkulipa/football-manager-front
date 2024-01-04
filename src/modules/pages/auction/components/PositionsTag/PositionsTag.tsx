import { Button } from '@/components';
import { IPositionsTagProps } from './PositionsTag.types';
import styles from './PositionTag.module.scss';

export const PositionsTag = ({
	positionName,
	onClick
}: IPositionsTagProps): JSX.Element => {
	return (
		<Button className={styles.tag} onClick={onClick}>
			<div>{positionName}</div>
			<div>&#10006;</div>
		</Button>
	);
};
