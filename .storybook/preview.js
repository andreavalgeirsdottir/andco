import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12

export const parameters = {
	backgrounds: {
		default: 'Light',
		values: [
			{
				name: 'Light',
				value: '#fff',
			},
			{
				name: 'Dark',
				value: '#333',
			},
		],
	},
	options: {
		storySort: {
			order: ['Theme', '*', 'Library', 'Sanity', 'Examples', ['*', 'Example', ['*', 'Example']]],
		},
	},
	nextRouter: {
		Provider: RouterContext.Provider,
	},
};
