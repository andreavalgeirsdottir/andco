import NextLink from 'next/link';
import { MouseEventHandler } from 'react';

import { hrefFromLink } from '@web/services/sanity/mappings';
import { type Link } from '@web/services/sanity/queries/objects';

export interface SanityLinkProps {
	link: Link;
	passHref?: boolean;
	children?: React.ReactNode;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function SanityLink({ link, passHref, children, onClick }: SanityLinkProps) {
	if (link.type === 'internal') {
		return (
			<NextLink passHref={passHref} href={hrefFromLink(link)}>
				<a onClick={onClick}>{children || link.title}</a>
			</NextLink>
		);
	}

	if (
		(link.type === 'external' && (link.url?.includes('mailto:') || link.url?.includes('tel:'))) ||
		link.type === 'file'
	) {
		return (
			<a href={hrefFromLink(link)} rel="noreferrer" onClick={onClick}>
				{children || link.title}
			</a>
		);
	}

	return (
		<a href={hrefFromLink(link)} target="_blank" rel="noreferrer" onClick={onClick}>
			{children || link.title}
		</a>
	);
}
