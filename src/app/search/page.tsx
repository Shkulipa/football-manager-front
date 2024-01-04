import { Search } from '@/modules/pages/search/Search';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Search'
};

export default async function Page() {
	return <Search />;
}
