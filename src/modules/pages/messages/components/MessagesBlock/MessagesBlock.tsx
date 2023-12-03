import * as Yup from 'yup';
import { Button, FormikInput } from '@/components';
import styles from './MessagesBlock.module.scss';
import { useAppSelector } from '@/hooks/redux';
import { IInitialValues, IMessagesBlockProps } from './MessagesBlock.types';
import { useFormik } from 'formik';
import { MessageItem } from '../MessageItem/MessageItem';
import { useEffect, useRef } from 'react';

const initialValues: IInitialValues = {
	message: ''
};

export const loginValidation = Yup.object().shape({
	message: Yup.string()
		.min(2, 'Should be 3+ symbols')
		.required('This Field is Required')
});

export const MessagesBlock = ({
	onSendMessage,
	messages
}: IMessagesBlockProps): JSX.Element => {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { user } = useAppSelector(s => s.userReducer);

	const formik = useFormik<IInitialValues>({
		initialValues,
		validationSchema: loginValidation,
		onSubmit: values => {
			onSendMessage(values.message);
			formik.setSubmitting(false);
			formik.resetForm();
		}
	});

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
		}
	}, [messages.length]);

	return (
		<div className={styles.messagesBlockWrapper}>
			<div ref={messagesEndRef} className={styles.messages}>
				{messages.map(m => (
					<MessageItem
						key={m.id}
						message={m}
						isMyMessage={m.user._id === user?._id}
					/>
				))}
			</div>

			<form
				onSubmit={formik.handleSubmit}
				autoComplete="off"
				className={styles.messagesBlockActionsWrapper}
			>
				<FormikInput
					key="message"
					name="message"
					placeholder="Your message..."
					formik={formik}
				/>
				<Button type="submit" disabled={formik.isSubmitting || !formik.isValid}>
					Send
				</Button>
			</form>
		</div>
	);
};
