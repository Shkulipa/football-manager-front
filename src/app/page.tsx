import { Htag, Ptag } from '@/components';
import { PaddingContainer } from '@/containers';

export default function Home() {
	return (
		<PaddingContainer>
			<Htag tag="h2">Demo</Htag>
			<div style={{ maxWidth: '991px' }}>
				<iframe
					width="960"
					height="540"
					src="https://www.youtube.com/embed/3MMVkBe5eXw"
				></iframe>
			</div>

			<br />
			<br />

			<Ptag style={{ maxWidth: '991px' }}>
				Welcome to the captivating world of football management in our game
				&apos;Master of Football&apos;! Become a true strategist and leader of
				your football club, where every decision you make matters. From building
				and assembling your team to devising tactics on the field - you are in
				complete control.
			</Ptag>
			<br />
			<Ptag style={{ maxWidth: '991px' }}>
				Construct your club from the ground up, choosing the best players,
				making lucrative deals in the transfer market, and developing the
				infrastructure of your stadium. Manage the club&apos;s finances,
				negotiate with sponsors, and climb your team up the league rankings.
			</Ptag>
			<br />
			<Ptag style={{ maxWidth: '991px' }}>
				On the field, every match is a strategic battle. Choose your formation,
				define your playing style, and react to events in real-time. Discover
				the unique abilities of your players and create your unbeatable team.
			</Ptag>
			<br />
			<Ptag style={{ maxWidth: '991px' }}>
				Make tactical substitutions, monitor player conditions, and make crucial
				decisions that can impact the outcome of the match. Your mastery of team
				management will determine success in leagues, cups, and global
				competitions.
			</Ptag>
			<br />
			<Ptag style={{ maxWidth: '991px' }}>
				Train your players, enhance their skills, and build a cohesive team of
				like-minded individuals. Be prepared for challenges, build your football
				empire, and prove that you are a true master of football management!
			</Ptag>
		</PaddingContainer>
	);
}
