import { ExtractStrict } from 'type-zoo/types';

import { Theme } from '@noa/theme';

export const config = {
	theme: {
		mode: ['light', 'dark'] as ExtractStrict<Theme['scheme'], 'dark' | 'light'>[],
	},
};
