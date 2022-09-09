import { Rule } from '@sanity/types';
import { AiOutlineGroup, AiOutlineLink } from 'react-icons/ai';

import { arrayFromNumber, pruneArray } from '../../../../../libs/utils/common/src';

/**
 * @internal
 */
const navigationLevel = (levelItems?: object, required = true) => {
	return {
		type: 'array',
		name: 'items',
		validation: required ? (rule: Rule) => rule.required() : undefined,
		of: [
			{
				type: 'link',
				icon: AiOutlineLink,
			},
			...(Object.keys(levelItems).length > 0
				? [
						{
							name: 'level',
							type: 'object',
							icon: AiOutlineGroup,
							title: 'Add Level',
							description: 'Add a new level to the navigation',
							fields: pruneArray([
								{
									name: 'title',
									type: 'string',
									validation: (rule: Rule) => rule.required(),
								},
								levelItems,
							]),
						},
				  ]
				: []),
		],
	};
};

/**
 * Generate X amount of nested navigation levels
 *
 * @returns `array` Sanity schema for nested navigation schema
 *
 * @example
 * ```tsx
 * export default {
 *   title: 'Nested Navigation',
 *   ...nestedNavigation(3),
 *   name: 'nestedNavigation',
 * };
 * ```
 */
export const nestedNavigation = (levels: number, required?: boolean) =>
	arrayFromNumber(levels).reduce((acc) => navigationLevel(acc, required), {});
