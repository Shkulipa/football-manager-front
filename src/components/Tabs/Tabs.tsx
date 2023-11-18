import { ITabsProps } from './Tabs.types';
import styles from './Tabs.module.scss';

export function Tabs({ tabHandler, tabs }: ITabsProps): JSX.Element {
	const tabButtons = tabs.map((t, idx) => (
		<button key={t} className={styles.tab} onClick={() => tabHandler(idx + 1)}>
			{t}
		</button>
	));

	return <div className={styles.tabs}>{tabButtons}</div>;
}
