import { ITimeLineProps } from '@/components/match/TimeLine/TimeLine.types';
import { Socket } from 'socket.io-client';

export interface IGameProps {
	sockets?: Socket;
	gameLength: ITimeLineProps['gameLength'];
	matchIteration: number;
}
