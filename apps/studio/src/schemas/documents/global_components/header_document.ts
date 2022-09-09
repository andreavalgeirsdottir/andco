import { RiLayoutTop2Line } from 'react-icons/ri';

import { nestedNavigation } from '../../utils/nested_navigation';

/**
 * Header
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	title: 'Header',
	name: 'headerDocument',
	type: 'document',
	description: 'Configuration for the header located at the top of the site',
	icon: RiLayoutTop2Line,
	fields: [
		{
			title: 'Menu',
			...nestedNavigation(3),
			name: 'menu',
		},
		{
			name: 'cta',
			title: 'CTA',
			type: 'link',
		},
	],
};
