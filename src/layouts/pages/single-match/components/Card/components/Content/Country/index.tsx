'use client';

import Image from 'next/image';
import { IContentProps } from '../content.types';
import styles from './Country.module.scss';
import { TextBlock } from '../../TextBlock';

export function Country({ img, text }: IContentProps): JSX.Element {
	return (
		<>
			<Image
				priority={true}
				className={styles.img}
				src={img}
				width={64}
				height={38}
				alt=""
			/>
			<TextBlock>{text}</TextBlock>
		</>
	);
}
