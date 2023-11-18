'use client';
import cn from 'classnames';
// https://www.npmjs.com/package/react-pro-sidebar
import {
	Sidebar as SideBarReactPro,
	Menu,
	MenuItem,
	sidebarClasses
} from 'react-pro-sidebar';
import { Arrow, Cup, SingleMatch, Stadium, Team } from '@/icons';
import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { ISidebarProps } from './Sidebar.types';
import { BtnIcon } from '..';
import { ROUTES } from '@/constants/routes.enum';
import { useAppSelector } from '@/hooks/redux';
import { Logout } from './components/Logout/Logout';
import { Login } from './components/Login/Login';

interface IAuthorizedRoute {
	icon: JSX.Element;
	link: string;
	label: string;
}
const authorizedRoutes: IAuthorizedRoute[] = [
	{
		icon: <Team width={28} height={28} />,
		link: ROUTES.USER_TEAM,
		label: 'Your Team'
	},
	{
		icon: <Cup width={28} height={28} />,
		link: ROUTES.RATING,
		label: 'Rating'
	}
];

export function Sidebar({
	isCollapseSidebar,
	setCollapseSidebar
}: ISidebarProps): JSX.Element {
	const { user } = useAppSelector(state => state.userReducer);

	const authorization = user ? <Logout /> : <Login />;

	const renderAuthorizedRoutes =
		user &&
		authorizedRoutes.map(r => (
			<MenuItem key={r.link} icon={r.icon} component={<Link href={r.link} />}>
				{r.label}
			</MenuItem>
		));

	return (
		<div className={cn(styles.sidebarWrapper)}>
			<BtnIcon
				onClick={setCollapseSidebar}
				className={cn(styles.collapseBtn, {
					[styles.flip]: isCollapseSidebar
				})}
			>
				<Arrow direction="top" />
			</BtnIcon>
			<SideBarReactPro
				collapsed={isCollapseSidebar}
				className={cn(styles.sidebar)}
				backgroundColor="#FFFFFF"
				width={'205px'}
				rootStyles={{
					[`.${sidebarClasses.container}`]: {
						borderRight: 'none'
					}
				}}
			>
				<Menu>
					<MenuItem
						icon={<Stadium width={32} height={32} />}
						component={<Link href={ROUTES.HOME} />}
					>
						Home
					</MenuItem>
					<MenuItem
						icon={<SingleMatch width={32} height={32} />}
						component={<Link href={ROUTES.SINGLE_MATCH} />}
					>
						Single Match
					</MenuItem>
					{renderAuthorizedRoutes}
					{authorization}
				</Menu>
			</SideBarReactPro>
		</div>
	);
}
