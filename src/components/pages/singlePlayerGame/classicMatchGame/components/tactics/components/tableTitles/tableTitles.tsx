import cn from 'classnames';

import { ITableTitlesProps } from './tableTitles.interfaces';
import styles from './tableTitles.module.scss';

export function TableTitles({ className, ...props }: ITableTitlesProps) {
	return (
		<div className={cn(styles.tableTitles, className)} {...props}>
			<div>#</div>
			<div>Name</div>
			<div>fitness</div>
		</div>
	);
}
