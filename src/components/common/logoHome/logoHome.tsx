import logoHome from 'src/assets/images/logo/logo-350x350.png';

import styles from './logoHome.module.scss';

export function LogoHome(): JSX.Element {
	return (
		<div className={styles.logoHome}>
			<img className={styles.logoHomeImg} src={logoHome} alt="logo-home" />
			<div className={styles.logoHomeText}>
				Soccer
				<br />
				Manager
			</div>
		</div>
	);
}
