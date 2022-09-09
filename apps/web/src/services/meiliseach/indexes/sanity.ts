import { meiliSearchClient } from '@noa/service-meilisearch';
import { keys } from '@noa/utils-common';

import { getClient } from '@apps/web/src/services/sanity/client';

const query = /* groq */ '*[_type == $type]';

export type SanityIndex = (Sanity.Schema.Page | Sanity.Schema.News) & {
	_index: 'page' | 'news';
};

export const seedSanity = async () => {
	const sanityClient = getClient(true);

	const responses = await Promise.all([
		await sanityClient.fetch<Sanity.Schema.Page[]>(query, { type: 'page' }),
		await sanityClient.fetch<Sanity.Schema.News[]>(query, { type: 'news' }),
	]);

	if (responses) {
		for await (const response of responses) {
			const _type = response?.[0]?._type;

			if (!_type) return;

			const index = meiliSearchClient.index(_type);

			const documents = response
				?.map<SanityIndex>((item) => ({
					_index: _type,
					uid: item?._id || item?.id,
					...item,
				}))
				?.filter((item) => {
					if (item?.options?.excludeFromSearch) {
						return !item.options.excludeFromSearch;
					}

					if (!item?.seo?.metaTitle && !item?.slug) {
						return false;
					}

					return true;
				});

			if (documents && keys(documents).length > 0) {
				await index.addDocuments(documents);
			}
		}
	}
};

export const deleteSanity = async () => {
	const page = await meiliSearchClient.deleteIndexIfExists('page');
	const news = await meiliSearchClient.deleteIndexIfExists('news');

	return {
		page,
		news,
	};
};
