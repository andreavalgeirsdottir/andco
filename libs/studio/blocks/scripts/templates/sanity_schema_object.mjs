export const template = `import { Rule } from '@sanity/types';
import { AiOutlineCode } from 'react-icons/ai';

/**
 * <%= blockNameFlagTitle; %>
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	title: '<%= blockNameFlagTitle; %>',
	name: '<%= blockNameTypeCamel; %>',
	type: '<%= schemaType; %>',
	icon: AiOutlineCode,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: (rule: Rule) => rule.required(),
			codegen: { required: true },
		},
	],<% if (schemaTypeFlag === 'block') { %>
		preview: {
		select: {
			title: 'title',
		},
		prepare: ({ title }) => {
			const componentTitle = ['<%= blockNameFlagTitle; %>'];

			return {
				title: \`\${title} [\${componentTitle.join(' | ')}]\`,
			};
		},
	},<% } %>
};
`;
