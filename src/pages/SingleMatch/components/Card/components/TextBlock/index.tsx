import { Ptag } from '@/components';
import { ITextBlockProps } from './Text.types';
import styles from './TextBlock.module.scss';

export function TextBlock({ children }: ITextBlockProps): JSX.Element {
	return (
		<Ptag size="m" className={styles.text}>
			{children}
		</Ptag>
	);
}
