import { IBlockContainerProps } from './BlockContainer.types';
import styles from './BlockContainer.module.scss';
import { BtnIcon } from '@/components';
import { Arrow } from '@/icons';

export default function BlockContainer({
	onPrevClick,
	onNextClick,
	isDisabledPrevBtn,
	isDisabledNextBtn,
	children
}: IBlockContainerProps): JSX.Element {
	return (
		<div className={styles.block}>
			<BtnIcon onClick={onPrevClick} disabled={isDisabledPrevBtn}>
				<Arrow direction="down" width={18} height={18} />
			</BtnIcon>
			<div className={styles.content}>{children}</div>
			<BtnIcon onClick={onNextClick} disabled={isDisabledNextBtn}>
				<Arrow direction="top" width={18} height={18} />
			</BtnIcon>
		</div>
	);
}
