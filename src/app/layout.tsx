import '@/styles/globals.scss';
import type { Metadata } from 'next';
import BaseLayout from '@/layouts/common/base-layout';
import { PropsWithChildren, DetailedHTMLProps, HTMLAttributes } from 'react';
import ReduxProvider from '@/store/provider';
import SWRProvider from '@/SWR/SWR.provider';

export const metadata: Metadata = {
	title: 'FM',
	description: 'Football Manager'
};

interface IRootLayoutProps
	extends PropsWithChildren<
		DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> {}

export default function RootLayout({ children }: IRootLayoutProps) {
	return (
		<html lang="en">
			<body>
				<link
					rel="preload"
					href="/fonts/minako/minako.ttf"
					as="font"
					type="font/ttf"
					crossOrigin="anonymous"
				/>
				<ReduxProvider>
					<SWRProvider>
						<BaseLayout>{children}</BaseLayout>
					</SWRProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
