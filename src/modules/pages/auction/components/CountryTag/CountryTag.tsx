import Image from 'next/image';
import { ICountryTagProps } from './CountryTag.types';
import styles from './CountryTag.module.scss';
import { Button } from '@/components';

export const CountryTag = ({
	country,
	onClick
}: ICountryTagProps): JSX.Element => {
	const { flag, name } = country;

	return (
		<Button className={styles.countryTagWrapper} onClick={onClick}>
			<Image
				className={styles.image}
				width={35}
				height={35}
				src={flag}
				alt=""
			/>
			<div>{name}</div>
			<div>&#10006;</div>
		</Button>
	);
};
