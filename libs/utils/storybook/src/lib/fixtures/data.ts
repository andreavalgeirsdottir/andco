import * as falso from '@ngneat/falso';

import { arrayFromNumber } from '@noa/utils-common';

const persons: {
	name: string;
	age: number;
}[] = arrayFromNumber(10).map(() => ({
	name: falso.randFullName({}),
	age: falso.randNumber({ min: 18, max: 60 }),
}));

/**
 * DO ONLY USE FOR STORYBOOK
 */
export const fixtures = {
	persons,
};
