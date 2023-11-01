import Image from 'next/image';
import { ILogoClubProps } from './LogoClub.types';
import styles from './LogoClub.module.scss';

export function LogoClub({ logoClub }: ILogoClubProps): JSX.Element {
	return (
		<Image
			width={100}
			height={100}
			className={styles.logo}
			src={logoClub}
			alt=""
		/>
	);
}
