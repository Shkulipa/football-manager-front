import { useState } from 'react';
import { ButtonMenu, MultiplayerMenu, Tab } from 'src/components';

import { ETabsMenu } from './menus.interfaces';
import styles from './menus.module.scss';

export function Menus() {
	const [tab, setTab] = useState<ETabsMenu>(ETabsMenu.SINGLE_GAME);

	const showTabContent = () => {
		if (tab === ETabsMenu.SINGLE_GAME) {
			return (
				<div className={styles.content}>
					<ButtonMenu to="/classic-match">Classic Match</ButtonMenu>
					<ButtonMenu to="/career">Career</ButtonMenu>
				</div>
			);
		}

		return (
			<div className={styles.content}>
				<MultiplayerMenu />
			</div>
		);
	};

	return (
		<div className={styles.menus}>
			<div className={styles.navigation}>
				<Tab
					isActive={tab === ETabsMenu.SINGLE_GAME}
					onClick={() => setTab(ETabsMenu.SINGLE_GAME)}
				>
					Single player game
				</Tab>
				<Tab
					isActive={tab === ETabsMenu.MULTIPLAYER}
					onClick={() => setTab(ETabsMenu.MULTIPLAYER)}
				>
					Multiplayer
				</Tab>
			</div>

			{showTabContent()}
		</div>
	);
}
