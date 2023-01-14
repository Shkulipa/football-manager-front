import cn from 'classnames';
import { ReactComponent as ArrowPrimarySVG } from 'src/assets/icons/arrow-primary.svg';

import { IArrowSliderProps } from './arrowSlider.interfaces';
import styles from './arrowSlider.module.scss';

export function ArrowSlider({
	isFlip,
	isDisabled,
	...props
}: IArrowSliderProps) {
	return (
		<ArrowPrimarySVG
			className={cn(styles.arrow, {
				[styles.flip]: isFlip,
				[styles.disabled]: isDisabled
			})}
			{...props}
		/>
	);
}
