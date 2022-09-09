import { Rule } from '@sanity/types';
import { VscReferences } from 'react-icons/vsc';

export default {
	title: 'Reference Pages',
	name: 'referencePageObject',
	type: 'object',
	icon: VscReferences,
	fields: [
		{
			name: 'reference',
			type: 'reference',
			to: [{ type: 'page' }, { type: 'news' }],
			validation: (rule: Rule) => rule.required(),
			codegen: { required: true },
		},
		{
			type: 'object',
			name: 'overwrite',
			title: 'Overwrite fields',
			description: 'If you want to overwrite the referenced page/news etc. fields',
			options: {
				collapsible: true,
				collapsed: false,
			},
			fields: [
				{
					title: 'Title',
					name: 'title',
					type: 'string',
				},
				{
					title: 'Subtitle',
					name: 'subtitle',
					type: 'simpleText',
				},
			],
		},
	],
	preview: {
		select: {
			reference: 'reference',
			overwrite: 'overwrite',
		},
		prepare: ({ overwrite }) => {
			const componentTitle = ['Reference'];

			return {
				title: `${overwrite?.title || ''} [${componentTitle.join(' | ')}]`,
			};
		},
	},
};
