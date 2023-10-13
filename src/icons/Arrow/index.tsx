import React from 'react';
import { IIconProps } from './../types/icon.types';
import { IconContainer } from '@/containers';
import { defaultIconSize } from '@/constants';

export function Arrow({
	width = defaultIconSize,
	height = defaultIconSize,
	fill = 'black',
	direction = 'right'
}: IIconProps): JSX.Element {
	return (
		<IconContainer direction={direction}>
			<svg
				width={width}
				height={height}
				viewBox="0 0 1024 1024"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M124.396,377h476.322l-186.23-180.625c-48.489-47.396-48.489-117.277,0-164.697c24.264-23.711,56.009-32.068,87.79-32.068
					c31.699,0,63.539,13.551,87.648,37.263l398.11,372.237c48.477,47.444,48.477,124.735,0,172.135l-398.11,407.584
					c-48.396,47.398-127.008,47.529-175.438,0.153c-48.489-47.444-48.489-135.418,0-182.862L600.719,625H124.396
					C55.939,625,0.378,568.059,0.378,501C0.378,433.92,55.939,377,124.396,377z"
					fill={fill}
				/>
			</svg>
		</IconContainer>
	);
}
