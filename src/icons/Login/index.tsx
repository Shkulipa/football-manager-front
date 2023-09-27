import React from 'react';
import { IIconProps } from './../types/icon.types';
import { IconContainer } from '@/containers';
import { defaultIconSize } from '@/constants';

export function Login({
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
					fillRule="evenodd"
					clipRule="evenodd"
					d="M20 23L12 23C11.4477 23 11 22.5523 11 22C11 21.4477 11.4477 21 12 21L20 21C20.5523 21 21 20.5523 21 20L21 4C21 3.44771 20.5523 3 20 3L12 3C11.4477 3 11 2.55228 11 2C11 1.44772 11.4477 1 12 1L20 0.999999C21.6569 0.999999 23 2.34315 23 4L23 20C23 21.6569 21.6569 23 20 23Z"
					fill={fill}
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M18.6881 10.6901C19.3396 11.4418 19.3396 12.5581 18.6881 13.3098L14.5114 18.1291C13.2988 19.5282 11 18.6707 11 16.8193L11 15L5 15C3.89543 15 3 14.1046 3 13L3 11C3 9.89541 3.89543 8.99998 5 8.99998L11 8.99998L11 7.18071C11 5.3293 13.2988 4.47176 14.5114 5.87085L18.6881 10.6901ZM16.6091 12.6549C16.9348 12.279 16.9348 11.7209 16.6091 11.345L13 7.18071L13 9.49998C13 10.3284 12.3284 11 11.5 11L5 11L5 13L11.5 13C12.3284 13 13 13.6716 13 14.5L13 16.8193L16.6091 12.6549Z"
					fill={fill}
				/>
			</svg>
		</IconContainer>
	);
}
