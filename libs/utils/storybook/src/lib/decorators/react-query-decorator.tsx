/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({});

/**
 * This is here for later reference of a way to create Decorator for a Provider
 */
export const ReactQueryDecorator = (Story: any) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Story />
		</QueryClientProvider>
	);
};
