'use client';
import cn from 'classnames';
import Image from 'next/image';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { IBaseLayoutProps } from './base-layout.interfaces';
import Link from 'next/link';
import styles from './base-layout.module.scss';
import { useState } from 'react';

export default function BaseLayout({
	children
}: IBaseLayoutProps): JSX.Element {
	const [isCollapseSidebar, setCollapseSidebar] = useState<boolean>(false);

	return (
		<div className={cn(styles.baseLayoutWrapper)}>
			<div className={cn(styles.sidebarWrapper)}>
				<button
					type="button"
					onClick={() => setCollapseSidebar(s => !s)}
					className={cn(styles.collapseBtn)}
				>
					c
				</button>
				<Sidebar collapsed={isCollapseSidebar} className={cn(styles.sidebar)}>
					<Menu>
						<MenuItem
							icon={
								<Image
									src="icons/single-match.svg"
									alt="single-match"
									width="30"
									height="30"
								/>
							}
							component={<Link href="/single-match" />}
						>
							Single Match
						</MenuItem>
						<MenuItem
							icon={
								<Image
									src="icons/teams.svg"
									alt="teams"
									width="40"
									height="40"
								/>
							}
							component={<Link href="/teams" />}
						>
							Teams
						</MenuItem>
						<MenuItem
							icon={
								<Image
									src="icons/login.svg"
									alt="login"
									width="32"
									height="32"
								/>
							}
							component={<Link href="/auth" />}
						>
							Log in
						</MenuItem>
					</Menu>
				</Sidebar>
			</div>

			<div>
				<header>header</header>
				<main>{children}</main>
			</div>
		</div>
	);
}
