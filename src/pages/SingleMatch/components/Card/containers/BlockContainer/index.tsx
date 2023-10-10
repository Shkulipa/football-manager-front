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
				<Arrow direction="left" />
			</BtnIcon>
			<div className={styles.content}>{children}</div>
			<BtnIcon onClick={onNextClick} disabled={isDisabledNextBtn}>
				<Arrow direction="right" />
			</BtnIcon>
		</div>
	);
}
