'use client';

import { useRef, useEffect } from 'react';

export const useUnmount = (fn: () => void): void => {
	const fnRef = useRef(fn);
	fnRef.current = fn;

	useEffect(() => () => fnRef.current(), []);
};
