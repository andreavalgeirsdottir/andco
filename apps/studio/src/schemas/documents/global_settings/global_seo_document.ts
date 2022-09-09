import { Rule } from '@sanity/types';
import { GiArcheryTarget } from 'react-icons/gi';

/**
 * Company information
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	title: 'Seo',
	name: 'globalSeoDocument',
	type: 'document',
	icon: GiArcheryTarget,
	fields: [
		{
			title: 'SEO',
			name: 'seo',
			description: 'These are the default og: tags, which will act as fallback values',
			type: 'seo',
			codegen: { required: true },
			validation: (rule: Rule) => rule.required(),
			options: {
				collapsible: false,
				collapsed: false,
			},
		},
	],
};
