import { IOptionProps } from './Option.types';
import styles from './Option.module.scss';
import { BtnIcon } from '@/components';
import { EyeShow, EyeClose } from '@/icons';

export function Option({ text, isOption, setOptionsMatch }: IOptionProps) {
	const eyeShow = (
		<BtnIcon className={styles.btnIcon} onClick={setOptionsMatch}>
			<EyeShow />
		</BtnIcon>
	);
	const eyeHidden = (
		<BtnIcon className={styles.btnIcon} onClick={setOptionsMatch}>
			<EyeClose />
		</BtnIcon>
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
