'use client';
import cn from 'classnames';
// https://www.npmjs.com/package/react-pro-sidebar
import {
	Sidebar as SideBarReactPro,
	Menu,
	MenuItem,
	sidebarClasses
} from 'react-pro-sidebar';
import { Arrow, SingleMatch, Teams } from '@/icons';
import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { ISidebarProps } from './Sidebar.types';
import { BtnIcon } from '..';
import { ROUTES } from '@/constants/routes.enum';
import { useAppSelector } from '@/hooks/redux';
import { Logout } from './components/Logout/Logout';
import { Login } from './components/Login/Login';

export function Sidebar({
	isCollapseSidebar,
	setCollapseSidebar
}: ISidebarProps): JSX.Element {
	const { user } = useAppSelector(state => state.userReducer);

	const authorization = user ? <Logout /> : <Login />;

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
						icon={<SingleMatch width={32} height={32} />}
						component={<Link href={ROUTES.SINGLE_MATCH} />}
					>
						Single Match
					</MenuItem>
					<MenuItem
						icon={<Teams width={50} height={50} />}
						component={<Link href={ROUTES.TEAMS} />}
					>
						Teams
					</MenuItem>
					{authorization}
				</Menu>
			</SideBarReactPro>
		</div>
	);
}
