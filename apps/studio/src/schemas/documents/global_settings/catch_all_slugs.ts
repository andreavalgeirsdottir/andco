import { Rule } from '@sanity/types';
import { MdOutlineAltRoute } from 'react-icons/md';

/**
 * Catch all slugs
 *
 * Slugs which should be catched if not found and redirected to this page
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	title: 'Catch All Slugs',
	name: 'catchAllSlugsDocument',
	description:
		'Slugs which should be catched if not found and redirected to this page. Prioritized from top and downwards',
	type: 'document',
	icon: MdOutlineAltRoute,
	fields: [
		{
			name: 'slugs',
			type: 'array',
			of: [
				{
					name: 'catched_slug',
					type: 'object',
					codegen: { required: true },
					validation: (rule: Rule) => rule.required(),
					fields: [
						{
							title: 'Catch',
							type: 'array',
							description:
								'The slugs that you want to catch and then redirect to the redirect field below (Supports RegExp)',
							name: 'catchSlug',
							validation: (rule: Rule) => rule.min(1).required(),
							of: [
								{
									type: 'string',
									name: 'slug_url',
								},
							],
						},
						{
							name: 'redirect',
							type: 'internalLink',
						},
					],
				},
			],
		},
	],
};
