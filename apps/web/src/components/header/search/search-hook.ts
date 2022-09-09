import { debounce, entries, isEmpty } from 'lodash';
import { getRoute } from 'next-type-safe-routes';
import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import { request } from '@noa/utils-requests';

import Config from '@apps/web/src/config';
import { SearchResponse } from '@apps/web/src/pages/api/v1/search';

export const useSearch = () => {
	const [input, setInput] = useState<string>('');
	const deferredText = useDeferredValue(input);

	const query = useQuery({
		queryKey: ['search', deferredText],
		queryFn: async () => {
			if (deferredText === '') {
				return;
			}

			const response = await request.get<SearchResponse>(getRoute('/api/v1/search'), {
				token: Config.MEILISEARCH_API_KEY,
				params: { s: deferredText },
			});

			return response.data;
		},
		retry: 1,
		select: (data) =>
			entries(
				{
					page: data.page,
					news: data.news,
					events: data.events,
				} || ({} as typeof data),
			),
		refetchOnMount: false,
		refetchInterval: false,
	});

	const hasResult = query?.data?.some(([_, indexes]) => indexes?.estimatedTotalHits > 0);

	const status = useMemo<'untouched' | 'no-result' | 'error' | 'result'>(() => {
		if (query?.isError) {
			return 'error';
		}

		if (
			isEmpty(query?.data) ||
			!query?.data.some(([_, indexes]) => {
				return !!indexes;
			})
		) {
			return 'untouched';
		}

		if (!hasResult) {
			return 'no-result';
		}

		return 'result';
	}, [hasResult, query?.data, query?.isError]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		debounce(
			(e) => {
				setInput(e.target.value);
			},
			250,
			{ trailing: true },
		),
		[],
	);

	return { deferredText, handleOnChange, query, setInput, hasResult, status };
};

export type UseSearchReturn = ReturnType<typeof useSearch>;
