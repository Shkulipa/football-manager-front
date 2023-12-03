export interface IMessageOn {
	id: string;
	user: IClient;
	msg: string;
	date: number;
}

export interface IClient {
	_id: string;
	username: string;
	socketId: string;
}
