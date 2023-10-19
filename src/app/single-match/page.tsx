import { getTeamsWithoutJoinSquad } from '@/api/rest/teams';
import { SingleMatchPage } from '@/pages/SingleMatch';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FM | Single Match',
	description:
		'Page "Single Match" for managing for real team or watch plays between AI'
};

export default async function Page() {
	const teams = await getTeamsWithoutJoinSquad();

	return <SingleMatchPage teams={teams} />;
}
