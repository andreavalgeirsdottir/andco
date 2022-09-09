import { SanityDocument, Slug } from '@sanity/types';

// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;

export function buildRelativeLink(type: string, slug = '') {
	if (slug === '/') {
		return slug;
	}

	if (type === 'news') {
		return `/news/news/${slug}`;
	}

	return `/${slug}`;
}

export default function resolvePreviewUrl(doc: SanityDocument & { slug: Slug }) {
	const previewUrl = new URL(process.env.SANITY_STUDIO_FRONTEND || 'http://localhost:4200');

	previewUrl.pathname = '/api/preview';
	previewUrl.searchParams.append('secret', previewSecret);

	const slug = buildRelativeLink(doc._type, doc?.slug?.current);

	previewUrl.searchParams.append('slug', slug);

	return previewUrl.toString();
}
