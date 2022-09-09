import { Rule } from '@sanity/types';
import { AiOutlineCode } from 'react-icons/ai';

/**
 * Report
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	title: 'Report',
	name: 'reportDocument',
	type: 'document',
	icon: AiOutlineCode,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: (rule: Rule) => rule.required(),
			codegen: { required: true },
		},
	],
};
