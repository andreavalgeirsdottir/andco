import { NextApiRequest, NextApiResponse } from 'next';

import {
	meiliSearchClient,
	prepareQueryForSearch,
	SearchAllIndex,
	searchAllIndexes,
} from '@noa/service-meilisearch';

import { Indexes } from '@apps/web/src/services/meiliseach/indexes';

export type SearchQuery = { s?: string };

export type SearchResponse = SearchAllIndex<Indexes>;

async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const searchAll = await searchAllIndexes<Indexes>(meiliSearchClient);
	const query: SearchQuery = req?.query;

	try {
		if (query?.s) {
			const queryString = prepareQueryForSearch(query.s);
			const response: SearchResponse = await searchAll(queryString);

			return res.status(200).json(response);
		}

		return res.status(200).json({});
	} catch (error) {
		console.error('Error: %s', error);

		if (error instanceof Error) {
			return res.status(500).json({
				name: error.name,
				message: error.message,
				cause: error.cause,
			});
		}

		return res.status(500).json({ error, message: error.message });
	}
}

export default handle;
