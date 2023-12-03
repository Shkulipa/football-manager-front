import { IMessageOn } from '../../Messages.types';

export interface IMessagesBlockProps {
	onSendMessage: (msg: string) => void;
	messages: IMessageOn[];
}

export interface IInitialValues {
	message: string;
}
