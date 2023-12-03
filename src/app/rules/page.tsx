import { Rules } from '@/modules/pages/rules/Rules';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FM | Rules'
};

export default async function Page() {
	return <Rules />;
}
