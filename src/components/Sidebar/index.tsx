'use client';
import cn from 'classnames';
// https://www.npmjs.com/package/react-pro-sidebar
import { Sidebar as SideBarReactPro, Menu, MenuItem } from 'react-pro-sidebar';
import { Arrow, SingleMatch, Teams, Login } from '@/icons';
import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { ISidebarProps } from './Sidebar.types';
import { BtnIcon } from '..';

export function Sidebar({
	isCollapseSidebar,
	setCollapseSidebar
}: ISidebarProps): JSX.Element {
	return (
		<div className={cn(styles.sidebarWrapper)}>
			<BtnIcon
				onClick={setCollapseSidebar}
				className={cn(styles.collapseBtn, {
					[styles.flip]: isCollapseSidebar
				})}
			>
				<Arrow direction="left" />
			</BtnIcon>
			<SideBarReactPro
				collapsed={isCollapseSidebar}
				className={cn(styles.sidebar)}
				backgroundColor="#FFFFFF"
				width={'205px'}
			>
				<Menu>
					<MenuItem
						icon={<SingleMatch width={32} height={32} />}
						component={<Link href="/single-match" />}
					>
						Single Match
					</MenuItem>
					<MenuItem
						icon={<Teams width={50} height={50} />}
						component={<Link href="/teams" />}
					>
						Teams
					</MenuItem>
					<MenuItem
						icon={<Login width={30} height={30} />}
						component={<Link href="/auth" />}
					>
						Log in
					</MenuItem>
				</Menu>
			</SideBarReactPro>
		</div>
	);
}
