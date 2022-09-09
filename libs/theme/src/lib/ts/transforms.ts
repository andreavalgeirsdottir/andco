import { isEmpty } from 'lodash';

import { prune } from '@noa/utils-common';

export const getStringFromCSSTransform = (
	obj?: Partial<Record<'rotate' | 'scale' | 'translateX' | 'translateY', string | number>>,
) => {
	const prunedObject = prune(obj);

	if (!prunedObject || isEmpty(prunedObject)) {
		return undefined;
	}

	return Object.entries(prunedObject)
		.map(([key, value]) => {
			if (key === 'rotate') {
				return `${key}(${value}deg)`;
			}

			return `${key}(${value})`;
		})
		.join(' ');
};
