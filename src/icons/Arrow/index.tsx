import React from 'react';
import { IIconProps } from './../types/icon.types';
import { IconContainer } from '@/containers';
import { defaultIconSize } from '@/constants';

export function Arrow({
	width = defaultIconSize,
	height = defaultIconSize,
	fill = 'black',
	direction = 'top'
}: IIconProps): JSX.Element {
	return (
		<IconContainer direction={direction}>
			<svg
				width={width}
				height={height}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12 6V18M12 6L7 11M12 6L17 11"
					stroke="#000000"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					fill={fill}
				/>
			</svg>
		</IconContainer>
	);
}
