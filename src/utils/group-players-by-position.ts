import { positions } from '@/constants/zone-positons';
import { IRealPlayer } from '@/types/football-simulator/real-player';

export const attackers = (players: IRealPlayer[]): IRealPlayer[] =>
	players.filter(player =>
		positions.attackers.some(position => player.positions.includes(position))
	);

export const midfielders = (players: IRealPlayer[]): IRealPlayer[] =>
	players.filter(player =>
		positions.midfielders.some(position => player.positions.includes(position))
	);

export const defenders = (players: IRealPlayer[]): IRealPlayer[] =>
	players.filter(player =>
		positions.defenders.some(position => player.positions.includes(position))
	);
