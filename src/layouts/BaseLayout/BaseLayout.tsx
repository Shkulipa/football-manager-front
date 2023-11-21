'use client';

import cn from 'classnames';
import { IBaseLayoutProps } from './BaseLayout.types';
import styles from './BaseLayout.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ContentLoader, Header, Sidebar } from '@/components';
import { ContentContainer } from '@/containers';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useUnmount } from '@/hooks/useUnmount';
import { reset } from './store/base-layout.slice';
import { ErrorContentModal } from './components/ErrorContentModal';

export function BaseLayout({ children }: IBaseLayoutProps): JSX.Element {
	const dispatch = useAppDispatch();
	const { isLoading, error } = useAppSelector(s => s.baseLayoutReducer);

	const headerRef = useRef<HTMLDivElement>(null);
	const [headerHeight, setHeaderHeigh] = useState<number>(0);
	const [isCollapseSidebar, setCollapseSidebar] = useState<boolean>(true);

	const callbackCollapseSidebar = useCallback(() => {
		setCollapseSidebar(s => !s);
	}, []);

	useUnmount(() => dispatch(reset()));

	useEffect(() => {
		if (headerRef?.current) {
			setHeaderHeigh(headerRef.current.offsetHeight);
		}
	}, [headerRef]);

	const isLoadingContent = isLoading ? <ContentLoader /> : children;
	const content = error ? <ErrorContentModal /> : isLoadingContent;

	return (
		<>
			<div className={cn(styles.baseLayoutWrapper)}>
				<Sidebar
					isCollapseSidebar={isCollapseSidebar}
					setCollapseSidebar={callbackCollapseSidebar}
				/>
				<ContentContainer>
					<Header ref={headerRef}>header</Header>
					<main
						className={cn(styles.main)}
						style={{ height: `calc(100vh - ${headerHeight}px)` }}
					>
						{content}
					</main>
				</ContentContainer>
			</div>
		</>
	);
}
