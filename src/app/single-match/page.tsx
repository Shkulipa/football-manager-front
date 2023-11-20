import { getTeamsWithoutJoinSquad } from '@/api/rest/teams/teams';
import { SingleMatchPage } from '@/modules/pages/single-match/SingleMatchPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'FM | Single Match',
	description:
		'Page "Single Match" for managing for real team or watch plays between AI'
};

export default async function Page() {
	const teams = await getTeamsWithoutJoinSquad();
	return <SingleMatchPage teams={teams || []} />;
}
