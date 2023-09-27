import Image from 'next/image';
import { IContentProps } from '../content.types';
import styles from './League.module.scss';
import { TextBlock } from '../../TextBlock';

export function League({ img, text }: IContentProps): JSX.Element {
	return (
		<>
			<Image className={styles.img} width={100} height={100} src={img} alt="" />
			<TextBlock>{text}</TextBlock>
		</>
	);
}
