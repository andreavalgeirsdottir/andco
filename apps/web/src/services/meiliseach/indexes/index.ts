import * as sanity from './sanity';

export * from './sanity';

export type Indexes = {
	news: sanity.SanityIndex;
	page: sanity.SanityIndex;
	events: sanity.SanityIndex;
};

export type IndexesKeys = keyof Indexes;
