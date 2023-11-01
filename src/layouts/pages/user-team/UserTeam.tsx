'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useUnmount } from '@/hooks/useUnmount';
import { useEffect } from 'react';
import { getUserTeam, reset } from './store/userTeam.slice';
import { CreateUserTeam } from './create-user-team';
import { SuccessCreatedUserTeam } from './success-created-user-team';
import { OwnUserTeam } from './own-user-team';
import { PaddingContainer } from '@/containers';

export const UserTeam = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(s => s.userReducer);
	const { step } = useAppSelector(s => s.userTeamReducer);

	useUnmount(() => dispatch(reset()));

	useEffect(() => {
		if (user && !step) dispatch(getUserTeam());
	}, [step]);

	let content: JSX.Element;
	switch (step) {
		case 'user-team':
			content = <OwnUserTeam />;
			break;
		case 'create-user-team':
			content = <CreateUserTeam />;
			break;
		case 'success-create':
			content = <SuccessCreatedUserTeam />;
			break;
		default:
			content = <></>;
	}

	return <PaddingContainer>{content}</PaddingContainer>;
};
