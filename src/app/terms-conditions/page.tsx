import { TermsConditional } from '@/modules/pages/terms-conditional';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FM | Terms COnditional'
};

export default async function Page() {
	return <TermsConditional />;
}
