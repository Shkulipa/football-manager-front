import { LinkProps } from 'next/link';
import { AnchorHTMLAttributes } from 'react';

export interface ITextLinkProps
	extends LinkProps,
		Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
	text: string;
}
