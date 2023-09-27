import '@/styles/globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BaseLayout from '@/layouts/common/base-layout';
import { PropsWithChildren, DetailedHTMLProps, HTMLAttributes } from 'react';
import ReduxProvider from '@/store/provider';
import SWRProvider from '@/SWR/SWR.provider';

const inter = Inter({ subsets: ['latin'] });

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
			<body className={inter.className}>
				<ReduxProvider>
					<SWRProvider>
						<BaseLayout>{children}</BaseLayout>
					</SWRProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
