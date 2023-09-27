import { getTeamsWithoutJoinSquad } from '@/api/rest/teams';
import { SingleMatchPage } from '@/pages/SingleMatch';

export default async function Page() {
	const teams = await getTeamsWithoutJoinSquad();

	return <SingleMatchPage teams={teams} />;
}
