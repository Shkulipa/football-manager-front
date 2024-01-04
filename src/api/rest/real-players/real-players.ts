import { apiPublic } from '@/api/instance';
import { IGetRealPlayersReq } from './types/get-real-players-req';
import { IGetRealPlayersRes } from './types/get-real-players-res';
import { IRealPlayer } from '@/types/football-simulator/real-player';

export const getRealPlayers = async (params: IGetRealPlayersReq) =>
	await apiPublic.get<IGetRealPlayersRes>('/real-player', { params });

export const getRealPlayer = async (id: string) =>
	await apiPublic.get<IRealPlayer>(`/real-player/${id}`);

export const apiRealPlayers = {
	getRealPlayers,
	getRealPlayer
};
