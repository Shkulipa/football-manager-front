import { Option } from 'src/components';

import { IOptionsProps } from './options.interfaces';
import styles from './options.module.scss';

export function Options({ optionsMatch, setOptionsMatch }: IOptionsProps) {
	const {
		isShowNumber,
		isShowName,
		isShowCoordinates,
		isShowFitness,
		isShowChanged
	} = optionsMatch;

	return (
		<div className={styles.options}>
			<Option
				text="Show number of player?"
				isOption={isShowNumber}
				setOptionsMatch={() =>
					setOptionsMatch(s => ({
						...s,
						isShowNumber: !s.isShowNumber
					}))
				}
			/>
			<Option
				text="Show name of player?"
				isOption={isShowName}
				setOptionsMatch={() =>
					setOptionsMatch(s => ({
						...s,
						isShowName: !s.isShowName
					}))
				}
			/>
			<Option
				text="Show fitness of player?"
				isOption={isShowFitness}
				setOptionsMatch={() =>
					setOptionsMatch(s => ({
						...s,
						isShowFitness: !s.isShowFitness
					}))
				}
			/>
			<Option
				text="Show changed players ?"
				isOption={isShowChanged}
				setOptionsMatch={() =>
					setOptionsMatch(s => ({
						...s,
						isShowChanged: !s.isShowChanged
					}))
				}
			/>
			<Option
				text="Show coordinates of player?"
				isOption={isShowCoordinates}
				setOptionsMatch={() =>
					setOptionsMatch(s => ({
						...s,
						isShowCoordinates: !s.isShowCoordinates
					}))
				}
			/>
		</div>
	);
}
