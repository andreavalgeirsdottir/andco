import startCase from 'lodash/startCase';
import { AiOutlineBank } from 'react-icons/ai';

import { Theme } from '@noa/theme';

const colorSchemes = ['light', 'dark'] as Theme['scheme'][];

/**
 * Logo with color scheme
 *
 * This is used to display the logo within different color scheme
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	title: 'Logo',
	description: 'Configuration for the Logo globally for the site',
	name: 'logoWithColorScheme',
	type: 'document',
	icon: AiOutlineBank,
	fields: [
		{
			type: 'image',
			name: 'logo',
			title: 'Logo',
		},
		{
			type: 'object',
			name: 'color_scheme',
			title: 'Color Scheme',
			description:
				'Logos for the different color schemes. Useful if you want to use a different logo for each color scheme.',
			options: {
				collapsed: true,
				collapsible: true,
			},
			fields: colorSchemes.map((c) => ({
				name: c,
				title: `On "${startCase(c)}" background`,
				type: 'image',
			})),
		},
	],
};
