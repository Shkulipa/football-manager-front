'use client';

import { CardContentModal } from '@/components/CardContentModal';
import { ContentModal } from '@/components/ContentModal';
import { useEffect } from 'react';

export const ErrorBoundary = () => {
	useEffect(() => {
		localStorage.clear();
		sessionStorage.clear();
	}, []);

	return (
		<ContentModal>
			<CardContentModal
				title="Occurred Error"
				description="Sorry, something went wrong &#128532;"
			/>
		</ContentModal>
	);
};
