import cn from 'classnames';

import { ITableTitlesProps } from './TableTitles.types';
import styles from './TableTitles.module.scss';
import { memo } from 'react';

function TableTitles({ className, ...props }: ITableTitlesProps) {
	return (
		<div className={cn(styles.tableTitles, className)} {...props}>
			<div>Pos</div>
			<div>#</div>
			<div>Name</div>
		</div>
	);
}

export const TableTitlesMemo = memo(TableTitles);
