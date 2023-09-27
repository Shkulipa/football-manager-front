import { HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

type THeading = 'h1' | 'h2' | 'h3';
export interface IHtagProps {
	tag: THeading;
	className?: string;
	children: ReactNode;
}

export interface IHtagAnimateProps
	extends HTMLMotionProps<THeading>,
		IHtagProps {
	children: ReactNode;
}
