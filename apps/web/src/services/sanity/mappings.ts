import { Link } from '@apps/web/src/services/sanity/queries/objects';

import type { TemplateKey } from '../../templates';

export function buildRelativeLink(type: TemplateKey, slug = '') {
	const cleanedSlug = slug?.replace(/\/\//g, '/').replace(/^\//, '');

	if (type === 'news') {
		return `/news/news/${cleanedSlug}`;
	}

	return `/${cleanedSlug}`;
}

/**
 * @returns `href` for an internal or external link
 *
 * @see {@link Link}
 */
export const hrefFromLink = (link?: Link): string => {
	try {
		if (!link.url) {
			throw Error(
				`[hrefFromLink] Something was probably wrong with the "${link?.type}" Link. You probably forgot to project the URL asset in the GROQ`,
			);
		}

		if (link['type'] === 'mailto') {
			if (!link?.url?.email) {
				throw Error('[hrefFromLink] Something was probably wrong with the "mailto" Link');
			}

			return `mailto:${link.url.email}`;
		}

		if (link['type'] === 'file') {
			if (!link?.file?.asset || (!link?.url?.url && !!link?.file?.asset)) {
				throw Error(
					'[hrefFromLink] Something was probably wrong with the "file" Link. You probably forgot to project the "file" asset',
				);
			}

			return link.url.url;
		}

		if (link['type'] === 'external') {
			if (!link?.url) {
				throw Error('[hrefFromLink] Something was probably wrong with the "external" Link');
			}

			return link.url;
		}

		if (link.type === 'internal') {
			if (!link?.url?.slug) {
				throw Error('[hrefFromLink] Something was probably wrong with the "internal" Link');
			}

			let url: string;

			if (link.url?.slug?.indexOf('/') === 0) {
				url = link.url.slug;
			} else {
				url = `/${link.url.slug}`;
			}

			if (link.anchor) {
				if (link?.anchor?.indexOf('#') === 0) {
					url = `${url}${link.anchor}`;
				} else {
					url = `${url}#${link.anchor}`;
				}
			}

			return buildRelativeLink(link.url.type, url);
		}

		throw Error('[hrefFromLink] Something was probably wrong with the "unknown" Link');
	} catch (err) {
		console.warn(err, link);
		return '';
	}
};
