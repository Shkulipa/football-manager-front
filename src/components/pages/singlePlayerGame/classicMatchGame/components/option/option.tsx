import { ReactComponent as EyeHidden } from 'src/assets/icons/eye-hidden.svg';
import { ReactComponent as EyeShow } from 'src/assets/icons/eye-show.svg';
import { ButtonIcon } from 'src/components';

import { IOptionProps } from './option.interfaces';
import styles from './option.module.scss';

export function Option({ text, isOption, setOptionsMatch }: IOptionProps) {
	const eyeShow = (
		<ButtonIcon onClick={setOptionsMatch}>
			<EyeShow className={styles.iconOptions} />
		</ButtonIcon>
	);
	const eyeHidden = (
		<ButtonIcon onClick={setOptionsMatch}>
			<EyeHidden className={styles.iconOptions} />
		</ButtonIcon>
	);

	const isShowIcon = isOption ? eyeShow : eyeHidden;

	return (
		<div>
			<div className={styles.option}>
				<div className={styles.text}>{text}</div>
				{isShowIcon}
			</div>
		</div>
	);
}
