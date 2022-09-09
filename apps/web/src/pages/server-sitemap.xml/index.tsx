import { GetServerSideProps } from 'next';
import { getServerSideSitemap } from 'next-sitemap';

import Config from '@web/config';
import { getClient } from '@web/services/sanity/client';

type PageObject = {
	_updatedAt: string;
	slug: string;
};

const frontpageQuery = /* groq */ `
*[_type == "frontpage"] {
    _updatedAt,
		"slug": "",
}`;

const pageQuery = /* groq */ `
*[_type == "page" && slug.current != null] {
    _updatedAt,
		"slug": slug.current,
}`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const client = getClient(false);

	const [singleInstance, pages] = await Promise.all([
		client.fetch<PageObject[]>(frontpageQuery),
		client.fetch<PageObject[]>(pageQuery),
		// client.fetch<PageObject[]>(newsQuery),
		// client.fetch<PageObject[]>(eventsQuery),
	]);

	const fields = [...singleInstance, ...pages].reduce((collector, { slug, _updatedAt }) => {
		collector.push({
			loc: slug ? [Config.BASE_URL, slug].join('/') : [Config.BASE_URL].join('/'),
			lastmod: _updatedAt,
		});

		return collector;
	}, [] as { loc: string; lastmod?: string }[]);

	return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
