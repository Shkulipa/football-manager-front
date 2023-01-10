import cn from 'classnames';
import { useState } from 'react';
import { LogoHome } from 'src/components';

import styles from './home.module.scss';

enum ETabsMenu {
	SINGLE_GAME = 'SINGLE_GAME',
	MULTIPLAYER = 'MULTIPLAYER'
}

export function Home(): JSX.Element {
	const [tab, setTab] = useState<ETabsMenu>(ETabsMenu.SINGLE_GAME);

	const showTabContent = () => {
		if (tab === ETabsMenu.SINGLE_GAME) {
			return <div className={styles.content}>SINGLE_GAME</div>;
		}

		return <div className={styles.content}>MULTIPLAYER</div>;
	};

	return (
		<div className={styles.home}>
			<div className={styles.homeMenuWrapper}>
				<div className={styles.homeMenu}>
					<LogoHome />

					<div className={styles.menus}>
						<div className={styles.navigation}>
							<div
								className={cn(styles.tab, {
									[styles.active]: tab === ETabsMenu.SINGLE_GAME
								})}
								onClick={() => setTab(ETabsMenu.SINGLE_GAME)}
							>
								Single Game
							</div>
							<div
								className={cn(styles.tab, {
									[styles.active]: tab === ETabsMenu.MULTIPLAYER
								})}
								onClick={() => setTab(ETabsMenu.MULTIPLAYER)}
							>
								Multiplayer
							</div>
						</div>

						{showTabContent()}
					</div>
				</div>
			</div>

			{/* line from the right of background*/}
			<div className={styles.path} />
		</div>
	);
}
