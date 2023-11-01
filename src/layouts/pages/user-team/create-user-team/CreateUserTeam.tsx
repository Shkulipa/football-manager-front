'use client';

import {
	Button,
	ErrorMsg,
	ErrorNotification,
	FormikInput,
	ModalWrapper,
	Ptag
} from '@/components';
import { useAppDispatch } from '@/hooks/redux';
import { ICreateUserTeamInitialValues } from './CreateUserTeam.types';
import { CreateUserTeamValidation } from './CreateUserTeam.validation';
import { useFormik } from 'formik';
import { CardFormContent } from '@/components/CardFormContent/CardFormContent';
import { useFileUpload } from '@/hooks/useFileUpload';
import styles from './CreateUserTeam.module.scss';
import { Photo } from '@/icons';
import Image from 'next/image';
import { createUserTeamAsync } from '../store/userTeam.slice';

const initialValues: ICreateUserTeamInitialValues = {
	clubName: '',
	userTeamImgField: null
};

export const CreateUserTeam = (): JSX.Element => {
	const dispatch = useAppDispatch();

	const formik = useFormik<ICreateUserTeamInitialValues>({
		initialValues,
		validationSchema: CreateUserTeamValidation,
		onSubmit: (values, formik) => {
			dispatch(createUserTeamAsync({ values, formik }));
		}
	});

	const { preview, inputRef, onChange } = useFileUpload({
		isPreview: true,
		onCustomChange: file => {
			formik.setFieldValue('userTeamImgField', file);
		}
	});

	// error from server
	const errorFromServer = typeof formik.errors === 'string' && (
		<ErrorNotification message={formik.errors} />
	);
	const errorFile = formik.errors.userTeamImgField && (
		<ErrorMsg className={styles.fileError}>
			{formik.errors.userTeamImgField}
		</ErrorMsg>
	);

	return (
		<ModalWrapper>
			<CardFormContent
				title="Creating Team"
				formProps={{
					onSubmit: formik.handleSubmit
				}}
				error={errorFromServer}
				buttons={[
					<Button
						key={1}
						type="submit"
						isLoading={formik.isSubmitting}
						disabled={!formik.isValid}
					>
						Create Team
					</Button>
				]}
			>
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
								<Ptag>Logo club</Ptag>
							</div>
						</div>
					)}
					{errorFile}
				</div>

				<FormikInput
					key="clubName"
					id="clubName"
					name="clubName"
					placeholder="Team name..."
					formik={formik}
				/>
			</CardFormContent>
		</ModalWrapper>
	);
};
