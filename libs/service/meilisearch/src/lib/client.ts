import { MeiliSearch } from 'meilisearch';

export * from 'meilisearch';

const NEXT_PUBLIC_MEILISEARCH_HOST = process.env['NEXT_PUBLIC_MEILISEARCH_HOST'] || 'http://localhost:7700';
const NEXT_PUBLIC_MEILISEARCH_API_KEY = process.env['NEXT_PUBLIC_MEILISEARCH_API_KEY'];

if (!NEXT_PUBLIC_MEILISEARCH_HOST) {
	throw new Error('NEXT_PUBLIC_MEILISEARCH_HOST is not defined');
}

export const initMeiliSearchClient = () => {
	try {
		const client = new MeiliSearch({
			host: NEXT_PUBLIC_MEILISEARCH_HOST,
			apiKey: NEXT_PUBLIC_MEILISEARCH_API_KEY,
		});

		return client;
	} catch (err) {
		if (err instanceof Error) {
			throw err;
		}

		throw new Error('Error loading MeiliSearch Client');
	}
};

export const meiliSearchClient = initMeiliSearchClient();
