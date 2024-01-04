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
import { Chat } from '@/icons/Chat';
import { Shop } from '@/icons/Shop';
import { Box } from '@/icons/Box';
import { Contract } from '@/icons/Contract';
import { Auction } from '@/icons/Auction';
import { Search } from '@/icons/Search';
import { Profile } from '@/icons/Profile';
/* import { Auction } from '@/icons/Auction';
import { Profile } from '@/icons/Profile'; */

interface IAuthorizedRoute {
	icon: JSX.Element;
	link: string;
	label: string;
}
export const publicRoutes: IAuthorizedRoute[] = [
	{
		icon: <Stadium width={32} height={32} />,
		link: ROUTES.HOME,
		label: 'Home'
	},
	{
		icon: <SingleMatch width={32} height={32} />,
		link: ROUTES.SINGLE_MATCH,
		label: 'Single Match'
	},
	{
		icon: <Search width={35} height={35} />,
		link: ROUTES.SEARCH,
		label: 'Search'
	},
	{
		icon: <Contract width={24} height={24} />,
		link: ROUTES.RULES,
		label: 'Rules'
	}
];
export const authorizedRoutes: IAuthorizedRoute[] = [
	{
		icon: <Team width={28} height={28} />,
		link: ROUTES.USER_TEAM,
		label: 'Your Team'
	},
	{
		icon: <Cup width={28} height={28} />,
		link: ROUTES.RATING,
		label: 'Rating'
	},
	{
		icon: <Chat width={28} height={28} />,
		link: ROUTES.MESSAGES,
		label: 'Messages'
	},
	{
		icon: <Shop width={28} height={28} />,
		link: ROUTES.SHOP,
		label: 'Shop'
	},
	{
		icon: <Box width={35} height={35} />,
		link: ROUTES.INVENTORY,
		label: 'Inventory'
	},
	{
		icon: <Auction width={35} height={35} />,
		link: ROUTES.AUCTION,
		label: 'Auction'
	},
	{
		icon: <Profile width={24} height={24} />,
		link: ROUTES.PROFILE,
		label: 'Profile'
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
			<MenuItem key={r.label} icon={r.icon} component={<Link href={r.link} />}>
				{r.label}
			</MenuItem>
		));
	const renderPublicRoutes = publicRoutes.map(r => (
		<MenuItem key={r.label} icon={r.icon} component={<Link href={r.link} />}>
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
					{renderPublicRoutes}
					{renderAuthorizedRoutes}
					{authorization}
				</Menu>
			</SideBarReactPro>
		</div>
	);
}
