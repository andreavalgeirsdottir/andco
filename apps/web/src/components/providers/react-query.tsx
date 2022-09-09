import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

type Props = { children: ReactNode };

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchInterval: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
			cacheTime: 1000 * 60 * 60, // 1 hour,
		},
	},
});

export const ReactQueryProvider = ({ children }: Props) => {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
