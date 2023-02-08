import { LogoHome, Menus } from 'src/components';

import styles from './home.module.scss';

export function Home(): JSX.Element {
	return (
		<div className={styles.home}>
			<div className={styles.homeMenuWrapper}>
				<div className={styles.homeMenu}>
					<LogoHome />
					<Menus />
				</div>
			</div>
		</div>
	);
}
