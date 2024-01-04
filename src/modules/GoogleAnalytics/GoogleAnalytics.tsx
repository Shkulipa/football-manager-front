'use client';

import { GoogleAnalytics as NextJsGoogleAnalytics } from 'nextjs-google-analytics';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export const GoogleAnalytics = () => {
	return <NextJsGoogleAnalytics gaMeasurementId={GA_MEASUREMENT_ID} />;
};
