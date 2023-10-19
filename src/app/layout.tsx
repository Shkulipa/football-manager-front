import '@/styles/globals.scss';
import type { Metadata } from 'next';
import BaseLayout from '@/layouts/common/BaseLayout';
import SWRProvider from '@/SWR/SWR.provider';
import { NetworkError, GlobalError } from '@/modules';
import ReduxProvider from '@/providers/ReduxProvider/ReduxProvider';
import { ICommonBasePropsWithChildren } from '@/types/commonProps';
import { AuthLayout } from '@/layouts/common/AuthLayout/AuthLayout';

export const metadata: Metadata = {
	title: 'FM',
	description:
		'Experience the thrill of managing your own football team. Football Manager lets you make strategic decisions, build your dream team, and lead them to victory. Take control of every aspect of the game and become a true football manager.'
};

interface IRootLayoutProps extends ICommonBasePropsWithChildren {}

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
						<NetworkError />
						<GlobalError />
						<BaseLayout>
							<AuthLayout>{children}</AuthLayout>
						</BaseLayout>
					</SWRProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
