import Link from 'next/link';
import { ITextLinkProps } from './TextLink.types';
import styles from './TextLink.module.scss';
import cn from 'classnames';

export const TextLink = ({
	text,
	className,
	...props
}: ITextLinkProps): JSX.Element => {
	return (
		<Link {...props} className={cn(styles.link, className)}>
			{text}
		</Link>
	);
};
