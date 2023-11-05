import Image from 'next/image';
import styles from './ImgInput.module.scss';
import { IImgInputProps } from './ImgInput.types';
import { Photo } from '@/icons';
import { ErrorMsg, Ptag } from '..';

export const ImgInput = ({
	preview,
	labelInput,
	inputRef,
	onChange,
	msgError
}: IImgInputProps): JSX.Element => {
	const errorFile = msgError && (
		<ErrorMsg className={styles.fileError}>{msgError}</ErrorMsg>
	);

	return (
		<div className={styles.imgInputWrapper}>
			{preview && (
				<Image
					className={styles.img}
					width={200}
					height={200}
					src={preview}
					onClick={() => inputRef.current?.click()}
					alt=""
				/>
			)}
			<input
				ref={inputRef}
				style={{ display: 'none' }}
				accept="image/png, image/jpeg, image/jpg"
				type="file"
				onChange={onChange}
			/>
			{!preview && (
				<div
					className={styles.img}
					style={{ width: '200px', height: '200px' }}
					onClick={() => inputRef.current?.click()}
				>
					<div className={styles.wrapperLogoContent}>
						<Photo />
						<Ptag>{labelInput}</Ptag>
					</div>
				</div>
			)}
			{errorFile}
		</div>
	);
};
