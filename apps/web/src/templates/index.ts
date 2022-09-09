import dynamic from 'next/dynamic';

import { GROQQuery } from '@apps/web/src/services/sanity/groq';
import { SlugMap } from '@apps/web/src/services/sanity/queries/types';
import { newsQuery, ProjectedNews } from '@apps/web/src/templates/news/query';
import { pageQuery, ProjectedPage } from '@web/templates/page/query';

export type DocumentTypeMap = {
	page: ProjectedPage;
	news: ProjectedNews;
};

export type TemplateMap = DocumentTypeMap;

export type TemplateKey = keyof DocumentTypeMap;

export type TemplateComponent<PageData> = React.ComponentType<{ pageData: PageData }>;

export type Templates = {
	[Key in TemplateKey]: {
		component: TemplateComponent<Key extends keyof DocumentTypeMap ? DocumentTypeMap[Key] : never>;
		groq?: GROQQuery;
	};
};

export const templates: Templates = {
	page: {
		groq: pageQuery,
		component: dynamic(import('./page')),
	},
	news: {
		groq: newsQuery,
		component: dynamic(import('./news')),
	},
} as const;

export function mapSlugToDocumentType<Queries extends object>(
	slug: string[],
	queries?: Queries,
): SlugMap<Queries> {
	if (slug[0] === 'news' && slug?.[1] === 'news' && slug?.[2]) {
		return {
			docType: 'news',
			queryParams: {
				...queries,
				slug: slug.join('/'),
			},
		};
	}

	return {
		docType: 'page',
		queryParams: {
			...queries,
			slug: slug.length === 0 ? '/' : slug.join('/'),
		},
	};
}
