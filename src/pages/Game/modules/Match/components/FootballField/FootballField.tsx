'use client';

import { useEffect, useRef } from 'react';
import styles from './FootballField.module.scss';
import { pitchSize } from '@/constants';
import { IFootballFieldProps } from './types/FootballField.types';
import { vizualizationIteration } from './utils/vizualizationIteration';

const widthStaticField = 850;

export function FootballField({
	matchDetails,
	optionsMatch
}: IFootballFieldProps): JSX.Element {
	const ratioPitch = pitchSize.pitchWidth / pitchSize.pitchHeight;
	const widthCanvas = pitchSize.pitchHeight * (widthStaticField / 1055);
	const heightCanvas = widthCanvas * ratioPitch;

	const canvasRef = useRef<HTMLCanvasElement>(null);

	/**
	 * @info
	 * the match after init
	 * vizulizate data on the canvas
	 */
	useEffect(() => {
		if (matchDetails && canvasRef.current) {
			vizualizationIteration(canvasRef.current, matchDetails, optionsMatch);
		}
	}, [matchDetails, canvasRef, optionsMatch]);

	return (
		<div
			className={styles.stadiumWrapper}
			style={{ width: widthStaticField, height: heightCanvas }}
		>
			<canvas
				className={styles.stadium}
				ref={canvasRef}
				style={{ width: heightCanvas }}
			/>
		</div>
	);
}
