import { ICommonBasePropsWithChildren } from '@/types/others/commonProps';
import { DetailedHTMLProps, FormHTMLAttributes } from 'react';

export interface ICardFormContentProps extends ICommonBasePropsWithChildren {
	title: string;
	error: boolean | JSX.Element;
	buttons: JSX.Element[];
	formProps: DetailedHTMLProps<
		FormHTMLAttributes<HTMLFormElement>,
		HTMLFormElement
	>;
}
