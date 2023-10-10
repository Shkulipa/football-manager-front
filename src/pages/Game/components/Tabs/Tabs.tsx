import { ITabsProps } from './Tabs.types';
import styles from './Tabs.module.scss';

export function Tabs({ tabHandler }: ITabsProps): JSX.Element {
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
			<button className={styles.tab} onClick={() => tabHandler(4)}>
				Tactics
			</button>
			<button className={styles.tab} onClick={() => tabHandler(5)}>
				Options
			</button>
		</div>
	);
}
