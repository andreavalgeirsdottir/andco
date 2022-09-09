import isArray from 'lodash/isArray';
import MeiliSearch, { SearchParams, SearchResponse } from 'meilisearch';

export type SearchIndex<T = Record<string, unknown>> = SearchResponse<T>;

/**
 * Search through a single index and return the `SearchResponse`
 *
 * @see {@link SearchResponse}
 * @see {@link MeiliSearch}
 *
 * @fastest
 */
export const searchIndex = <T = Record<string, unknown>>(client: MeiliSearch, indexUid: string) => {
	const index = client.index(indexUid);

	const handleSearch = (search: string, config?: SearchParams): Promise<SearchIndex> => {
		return index.search<T>(search, config);
	};

	return handleSearch;
};

export type SearchAllIndex<Data = Record<string, unknown>> = {
	[Key in keyof Data]: SearchIndex<Data[Key]>;
};

/**
 * Search through all the Index
 *
 * @see {@link SearchResponse}
 * @see {@link MeiliSearch}
 *
 * @heavy
 */
export const searchAllIndexes = async <T = Record<string, unknown>>(client: MeiliSearch) => {
	const { results: indexes } = await client.getIndexes();

	const handleSearch = async (search: string, config?: SearchParams): Promise<SearchAllIndex<T>> => {
		const searchedIndexes = await Promise.all(indexes.map((index) => index.search<T>(search, config)));

		const response = indexes.reduce(
			(acc, value, index) => ({
				...(acc || {}),
				[value.uid]: { ...searchedIndexes[index], _type: value.uid },
			}),
			{} as SearchAllIndex<T>,
		);

		return response as SearchAllIndex<T>;
	};

	return handleSearch;
};

/**
 * A query string can be either a string or array of strings.
 *
 * This is a helper to either get the first item of the array or return the string itself.
 *
 * @returns string | undefined
 */
export const prepareQueryForSearch = (query: string | string[] | undefined) => {
	if (isArray(query)) {
		return query[0];
	}

	return query;
};
