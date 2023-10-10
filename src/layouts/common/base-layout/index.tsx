'use client';
import cn from 'classnames';
import { IBaseLayoutProps } from './base-layout.types';
import styles from './base-layout.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Header, Sidebar } from '@/components';
import { ContentContainer } from '@/containers';

export default function BaseLayout({
	children
}: IBaseLayoutProps): JSX.Element {
	const headerRef = useRef<HTMLDivElement>(null);
	const [headerHeight, setHeaderHeigh] = useState<number>(0);
	const [isCollapseSidebar, setCollapseSidebar] = useState<boolean>(true);

	const callbackCollapseSidebar = useCallback(() => {
		setCollapseSidebar(s => !s);
	}, []);

	useEffect(() => {
		if (headerRef?.current) {
			setHeaderHeigh(headerRef.current.offsetHeight);
		}
	}, [headerRef]);

	return (
		<div className={cn(styles.baseLayoutWrapper)}>
			<Sidebar
				isCollapseSidebar={isCollapseSidebar}
				setCollapseSidebar={callbackCollapseSidebar}
			/>

			<ContentContainer>
				<Header ref={headerRef}>header</Header>
				<main
					className={cn(styles.main)}
					style={{ height: `calc(100% - ${headerHeight}px)` }}
				>
					{children}
				</main>
			</ContentContainer>
		</div>
	);
}
