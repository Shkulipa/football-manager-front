import { ArrowSlider } from 'src/components';

import { BlockLayout } from './../';
import { ICountryBlockProps } from './countryBlock.interfaces';
import styles from './countryBlock.module.scss';

export function CountryBlock({ country, back, next }: ICountryBlockProps) {
	return (
		<BlockLayout className={styles.country}>
			<div className={styles.countryName}>{country?.country}</div>
			<div className={styles.countrySlider}>
				<ArrowSlider onClick={back} isFlip />
				<img
					className={styles.flag}
					src={country?.flag}
					alt={country?.country}
					key={country?._id}
				/>
				<ArrowSlider onClick={next} />
			</div>
		</BlockLayout>
	);
}
