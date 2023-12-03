import '@/styles/globals.scss';
import '@/styles/vendor/rc-pagination.scss';
import type { Metadata } from 'next';
import SWRProvider from '@/SWR/SWR.provider';
import ReduxProvider from '@/providers/ReduxProvider/ReduxProvider';
import { ICommonBasePropsWithChildren } from '@/types/others/commonProps';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';
import { Suspense } from 'react';
import { ContentLoader } from '@/components';
import { GlobalError } from '@/modules/modals/GlobalError/GlobalError';
import { NetworkError } from '@/modules/modals/NetworkError/NetworkError';
import { BaseLayout } from '@/layouts/BaseLayout';
import NextTopLoader from 'nextjs-toploader';

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
						<NextTopLoader
							color="black"
							height={7}
							zIndex={9999}
							showSpinner={false}
							shadow="0 0 0 #fff"
						/>
						<AuthLayout>
							<BaseLayout>
								<Suspense fallback={<ContentLoader />}>{children}</Suspense>
							</BaseLayout>
						</AuthLayout>
					</SWRProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
