'use client';

import { useRef, useEffect, RefObject } from 'react';

export const useClickOutside = (
	callback: () => void
): RefObject<HTMLDivElement> => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback();
			}
		};

		document.addEventListener('click', handleClickOutside, true);

		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [callback]);

	return ref;
};
