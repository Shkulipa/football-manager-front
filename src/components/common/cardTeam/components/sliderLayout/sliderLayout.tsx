import cn from 'classnames';

import { ISliderLayout } from './sliderLayout.interfaces';
import styles from './sliderLayout.module.scss';

export function SliderLayout({ className, children, ...props }: ISliderLayout) {
	return (
		<div className={cn(styles.sliderLayout, className)} {...props}>
			{children}
		</div>
	);
}
