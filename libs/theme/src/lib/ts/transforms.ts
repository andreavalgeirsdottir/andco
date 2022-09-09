import { isEmpty } from 'lodash';

import { entries, prune } from '@noa/utils-common';

export const getStringFromCSSTransform = (
	obj?: Partial<Record<'rotate' | 'scale' | 'translateX' | 'translateY', number>>,
) => {
	const prunedObject = prune(obj);

	if (!prunedObject || isEmpty(prunedObject)) {
		return undefined;
	}

	return entries(prunedObject)
		.map(([key, value]) => {
			if (key === 'rotate') {
				return `${key}(${value}deg)`;
			}

			if (key === 'translateX') {
				return `${key}(${value}px)`;
			}

			if (key === 'translateY') {
				return `${key}(${value}px)`;
			}

			return `${key}(${value})`;
		})
		.join(' ');
};
