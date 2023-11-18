'use client';

import {
	Button,
	ErrorNotification,
	FormikInput,
	ModalWrapper
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { ICreateUserTeamInitialValues } from './CreateUserTeam.types';
import { CreateUserTeamValidation } from './CreateUserTeam.validation';
import { useFormik } from 'formik';
import { CardFormContent } from '@/components/CardFormContent/CardFormContent';
import { useFileUpload } from '@/hooks/useFileUpload';
import { createUserTeamAsync, setStep } from '../../store/userTeam.slice';
import { ImgInput } from '@/components/ImgInput/ImgInput';
import { useEffect } from 'react';

const initialValues: ICreateUserTeamInitialValues = {
	clubName: '',
	userTeamImgField: null
};

export const CreateUserTeam = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { initVersionTeam } = useAppSelector(s => s.userTeamReducer);

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

	useEffect(() => {
		if (initVersionTeam) {
			dispatch(setStep('user-team'));
			return;
		}
	}, [initVersionTeam]);

	// error from server
	const errorFromServer = typeof formik.errors === 'string' && (
		<ErrorNotification message={formik.errors} />
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
				<ImgInput
					inputRef={inputRef}
					labelInput="Logo Club"
					onChange={onChange}
					preview={preview || ''}
					msgError={formik.errors.userTeamImgField}
				/>

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
