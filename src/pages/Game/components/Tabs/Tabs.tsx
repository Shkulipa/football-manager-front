import { ITabsProps } from './Tabs.types';
import styles from './Tabs.module.scss';
import { useAppSelector } from '@/hooks/redux';

export function Tabs({ tabHandler }: ITabsProps): JSX.Element {
	const { userFor } = useAppSelector(state => state.singleMatchReducer);

	const isShowTactics = userFor && (
		<button className={styles.tab} onClick={() => tabHandler(4)}>
			Tactics
		</button>
	);

	return (
		<div className={styles.tabs}>
			<button className={styles.tab} onClick={() => tabHandler(1)}>
				Match
			</button>
			<button className={styles.tab} onClick={() => tabHandler(2)}>
				Statistics
			</button>
			<button className={styles.tab} onClick={() => tabHandler(3)}>
				Teams
			</button>
			{isShowTactics}
			<button className={styles.tab} onClick={() => tabHandler(5)}>
				Options
			</button>
		</div>
	);
}
