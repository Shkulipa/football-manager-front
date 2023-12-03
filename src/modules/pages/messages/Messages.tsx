'use client';

import { MessagesLayout } from '@/layouts/MessagesLayout';
import { Chat } from './components/Chat/Chat';
import styles from './Messages.module.scss';
import { Ptag } from '@/components';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Socket, io } from 'socket.io-client';
import { SERVER_URL } from '@/constants';
import { handleWsActionErrors } from '@/utils/handle-ws-actions-errors';
import { IServerError } from '@/api/rest/types/server-error';
import { MessagesBlock } from './components/MessagesBlock';
import { IMessageOn } from './Messages.types';

export const Messages = (): JSX.Element => {
	const socket = useRef<Socket | null>(null);
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(s => s.userReducer);

	const [messages, setMessages] = useState<IMessageOn[]>([]);

	const [chatId, setChatId] = useState<string | null>(null);

	const onSendMessage = (msg: string) => {
		if (socket.current) {
			socket.current.emit('send-msg-chat', { chatId, msg });
		}
	};

	useEffect(() => {
		const connectSockets = async () => {
			if (socket.current) socket.current.close();

			if (SERVER_URL && !socket.current && chatId) {
				// connect to socket
				const socketClient = io(`${SERVER_URL}/chats`, {
					auth: {
						token: user?.accessToken || ''
					},
					transports: ['websocket']
				});
				socket.current = socketClient;
				socket.current.emit('join-to-chat', { chatId });

				/**
				 * @info
				 * error before connecting
				 */
				socket.current.on('connect_error', data => {
					console.error('connect_error', data);
					socket.current?.close();
					handleWsActionErrors({
						e: data,
						dispatch
					});
				});

				// listening about getting messages from another users
				socket.current.on('msg-chat', (data: IMessageOn) => {
					setMessages(s => [...s, data]);
				});

				// get once old messages
				socket.current.once('get-old-messages', (data: IMessageOn[]) => {
					setMessages(data);
				});

				/**
				 * @info
				 * errors after connecting to ws
				 */
				socket.current.on('exception', (data: string) => {
					const err = JSON.parse(data) as IServerError;
					console.error('err', err);

					handleWsActionErrors({
						e: err,
						dispatch
					});
				});
			}
		};

		connectSockets();
	}, [chatId]);

	const leftSide = !chatId ? (
		<div className={styles.leftSideWrapper}>
			<Ptag size="l">Pick any chat from the right side</Ptag>
		</div>
	) : (
		<MessagesBlock messages={messages} onSendMessage={onSendMessage} />
	);

	const onSetChatId = (id: string) => {
		setChatId(id);
	};

	return (
		<MessagesLayout
			leftSide={leftSide}
			rightSide={
				<Chat
					id="general"
					text="General"
					onClick={() => onSetChatId('general')}
					isActive={'general' === chatId}
				/>
			}
		/>
	);
};
