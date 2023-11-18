'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useUnmount } from '@/hooks/useUnmount';
import { useEffect } from 'react';
import { getUserTeam, reset } from './store/userTeam.slice';
import { CreateUserTeam } from './modules/create-user-team';
import { SuccessCreatedUserTeam } from './modules/success-created-user-team';
import { OwnUserTeam } from './modules/own-user-team';
import { SuccessDeletedTeam } from './modules/success-deleted-team';

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
		case 'success-deleted-team':
			content = <SuccessDeletedTeam />;
			break;
		default:
			content = <></>;
	}

	return content;
};
