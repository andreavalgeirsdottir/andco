import { AiOutlineLink } from 'react-icons/ai';
import { RiLayoutBottom2Line } from 'react-icons/ri';

import { nestedNavigation } from '../../utils/nested_navigation';

/**
 * Footer
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	title: 'Footer',
	name: 'footerDocument',
	type: 'document',
	description: 'Configuration for the footer located at the bottom of the site',
	icon: RiLayoutBottom2Line,
	fields: [
		{
			type: 'boolean',
			name: 'useHeaderMenu',
			title: 'Use the header menu as menu',
			description: 'If enabled, the header menu will also be used as the footer menu',
			initialValue: false,
		},
		{
			title: 'Menu',
			...nestedNavigation(3, false),
			readOnly: (v) => v?.parent?.useHeaderMenu === true,
			name: 'menu',
		},
		{
			name: 'bottom',
			type: 'object',
			fields: [
				{
					title: 'Menu',
					name: 'menu',
					type: 'array',
					of: [
						{
							type: 'link',
							icon: AiOutlineLink,
						},
					],
				},
				{
					type: 'simpleText',
					title: 'Copyright',
					name: 'copyright',
				},
			],
		},
	],
};
