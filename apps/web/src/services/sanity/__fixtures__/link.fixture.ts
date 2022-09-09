import { ExternalLink, InternalLink } from '@web/services/sanity/queries/objects';

export const internalLinkFixture: InternalLink = {
	_type: 'link',
	type: 'internal',
	url: { slug: 'about', type: 'page' },
	title: 'About',
};

export const externalLinkFixture: ExternalLink = {
	_type: 'link',
	type: 'external',
	url: 'https://google.com',
	title: 'Google',
};
