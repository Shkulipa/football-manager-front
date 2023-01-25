import { IOptionsMatch } from './../interfaces/optionsMatch';
import { radiusItems } from './consts';

const imageBall = new Image();
imageBall.src = 'src/assets/images/logo/logo-350x350.png';

function canvas_arrow(ctx: any, fromx: any, fromy: any, tox: any, toy: any) {
	const headlen = 8; // length of head in pixels
	const dx = tox - fromx;
	const dy = toy - fromy;
	const angle = Math.atan2(dy, dx);
	ctx.lineWidth = 1.8;
	ctx.moveTo(fromx, fromy);
	ctx.lineTo(tox, toy);
	ctx.lineTo(
		tox - headlen * Math.cos(angle - Math.PI / 6),
		toy - headlen * Math.sin(angle - Math.PI / 6)
	);
	ctx.moveTo(tox, toy);
	ctx.lineTo(
		tox - headlen * Math.cos(angle + Math.PI / 6),
		toy - headlen * Math.sin(angle + Math.PI / 6)
	);
	ctx.stroke();
}

export const vizualizationIteration = (
	canvas: HTMLCanvasElement,
	matchDetails: any,
	optionsMatch?: IOptionsMatch
) => {
	const { pitchSize, ball, kickOffTeam, secondTeam } = matchDetails;
	const ctx = canvas.getContext('2d')!;
	ctx.canvas.width = pitchSize[0];
	ctx.canvas.height = pitchSize[1];

	const players = [...secondTeam.players, ...kickOffTeam.players];
	/**
	 * @info
	 * postions of players
	 */
	for (let i = 0; i < players.length; i++) {
		const player = players[i];
		const playerPositionX = player.currentPOS[0];
		const playerPositionY = player.currentPOS[1];

		// border of players
		ctx.beginPath();
		ctx.moveTo(playerPositionX, playerPositionY);

		ctx.arc(
			playerPositionX,
			playerPositionY,
			radiusItems + 1.5,
			0,
			2 * Math.PI
		);
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.closePath();

		// fill of players
		ctx.beginPath();
		ctx.moveTo(playerPositionX, playerPositionY);
		ctx.arc(playerPositionX, playerPositionY, radiusItems, 0, 2 * Math.PI);

		if (i < players.length / 2) {
			ctx.fillStyle = 'orange';
		} else {
			ctx.fillStyle = 'blue';
		}
		ctx.fill();
		ctx.closePath();

		// options
		ctx.save();
		ctx.font = '26px minako';
		ctx.fillStyle = 'white';
		ctx.moveTo(playerPositionX, playerPositionY);
		ctx.translate(playerPositionX + radiusItems / 2, playerPositionY);
		ctx.rotate(-Math.PI / 2);
		ctx.textAlign = 'center';

		// options of the match
		if (optionsMatch) {
			// for indent
			const filterOptionsForIndentUp = {
				1: optionsMatch.isShowCoordinates,
				2: optionsMatch.isShowName
			};
			const countOptionsInUp = Object.values(filterOptionsForIndentUp).filter(
				o => o
			).length;
			optionsMatch?.isShowName &&
				ctx.fillText(players[i].name, 0, -radiusItems - 20); // in the up
			if (optionsMatch?.isShowCoordinates) {
				const position = `${playerPositionX} | ${playerPositionY}`;
				const additionalIndent = countOptionsInUp * 25;
				ctx.fillText(position, 0, -radiusItems - additionalIndent); // in the up
			}

			optionsMatch?.isShowNumber && ctx.fillText(players[i].number, 0, 0); // in the middle
			optionsMatch?.isShowFitness &&
				ctx.fillText(players[i].fitness.toFixed() + '%', 0, radiusItems + 20);
		}
		ctx.restore();

		/* if (optionsMatch?.isShowChanged) {
			// arc
			ctx.beginPath();
			ctx.save();
			ctx.arc(
				playerPositionX - radiusItems / 2 - 8,
				playerPositionY - radiusItems / 2 - 8,
				radiusItems / 1.5,
				0,
				2 * Math.PI
			);
			ctx.fillStyle = 'white';
			ctx.fill();
			ctx.restore();
			ctx.closePath();

			// arrow
			ctx.beginPath();
			ctx.save();
			const path = new Path2D();
			path.moveTo(
				playerPositionX - radiusItems - 6,
				playerPositionY - radiusItems / 2 - 8
			);
			path.lineTo(
				playerPositionX - radiusItems / 2 - 3,
				playerPositionY - radiusItems / 2 - 3
			);
			path.lineTo(
				playerPositionX - radiusItems / 2 - 3,
				playerPositionY - radiusItems - 5
			);
			ctx.fillStyle = 'green';
			ctx.fill(path);
			ctx.restore();
			ctx.closePath();
		} */

		/**
		 * @info
		 * ball
		 */
		const radiusBall = radiusItems + 4;
		const ballPositionX = ball.position[0];
		const ballPositionY = ball.position[1];
		ctx.drawImage(
			imageBall,
			ballPositionX - radiusBall / 2,
			ballPositionY - radiusBall / 2,
			radiusBall,
			radiusBall
		);
	}
};
