import { groq } from 'next-sanity';

import { getClient } from '@apps/web/src/services/sanity/client';
import { pickDraft } from '@apps/web/src/services/sanity/helpers';
import { buildRelativeLink } from '@apps/web/src/services/sanity/mappings';
import {
	globalComponentsQuery,
	ProjectedGlobalComponents,
} from '@apps/web/src/services/sanity/queries/global_components';
import {
	globalSettingsQuery,
	ProjectedGlobalSettings,
} from '@apps/web/src/services/sanity/queries/global_settings';
import { SlugMap } from '@apps/web/src/services/sanity/queries/types';
import { TemplateKey, TemplateMap, templates } from '@apps/web/src/templates';
import { RouteSlug } from '@apps/web/src/utils/slugs';

const prefixSlug = (slug?: RouteSlug[], prefix?: TemplateKey): RouteSlug[] => {
	if (!slug) {
		return [];
	}

	if (!prefix) {
		return slug;
	}

	return slug.map((s) => ({ ...s, slug: buildRelativeLink(prefix, s.slug) }));
};

export const fetchSanitySlugs = async (): Promise<Record<'pages' | 'news', RouteSlug[]>> => {
	try {
		const client = getClient(false);

		const pageQuery = groq`*[_type == "page"]{
			"slug": slug.current
		}`;
		const newsQuery = groq`*[_type == "news"]{
			"slug": slug.current
		}`;

		const [pages, news] = await Promise.all([
			client.fetch<RouteSlug[]>(pageQuery),
			client.fetch<RouteSlug[]>(newsQuery),
		]);

		return { pages, news: prefixSlug(news, 'news') };
	} catch (err) {
		console.error(err);
		return { pages: [], news: [] };
	}
};

export const fetchSanityData = async (slugMap: SlugMap | undefined, preview?: boolean) => {
	try {
		const client = getClient(true);
		const { query, params } = templates[slugMap?.docType]?.groq || {};

		const collectedQueries = {
			...(slugMap?.queryParams || {}),
			...(params || {}),
		};

		const [globalSettings, globalComponents, pageData] = await Promise.all([
			client.fetch<ProjectedGlobalSettings>(globalSettingsQuery, collectedQueries),
			client.fetch<ProjectedGlobalComponents>(globalComponentsQuery, collectedQueries),
			client.fetch<TemplateMap[typeof slugMap.docType][]>(query, collectedQueries), // <--- Add locale to the template query `${locale}`
		]);

		return {
			globalSettings: pickDraft(globalSettings, preview),
			globalComponents: pickDraft(globalComponents, preview),
			pageData: pickDraft(pageData, preview),
		};
	} catch (err) {
		console.error(err);
		return { globalSettings: null, globalComponents: null, pageData: null };
	}
};
