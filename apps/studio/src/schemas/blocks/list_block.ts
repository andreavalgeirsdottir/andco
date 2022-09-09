import { Rule } from '@sanity/types';
import { BsListUl } from 'react-icons/bs';

import { linkValidation } from '../objects/link';
import block_options from '../templates/block_options';

export default {
	title: 'List',
	name: 'listBlock',
	type: 'object',
	icon: BsListUl,
	fields: [
		{
			...block_options,
			fields: [
				{
					type: 'backgroundColorObject',
					name: 'backgroundColor',
					initialValue: {
						color: 'none',
					},
				},
				{
					type: 'number',
					name: 'limit',
					initialValue: 3,
				},
				{
					type: 'string',
					name: 'fallbackText',
					title: 'Fallback text',
					initialValue: 'There are no items to display.',
					description: 'This is the text that will be displayed if the list is empty',
				},
			],
		},
		{
			type: 'string',
			name: 'type',
			title: 'Type',
			options: {
				list: [
					{
						value: 'news',
						title: 'News',
					},
					{
						value: 'page',
						title: 'Pages',
					},
				],
			},
			validation: (rule: Rule) => rule.required(),
			codegen: { required: true },
		},
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			name: 'cta',
			title: 'CTA',
			description: 'Optional',
			type: 'link',
			validation: (rule: Rule) => linkValidation(rule, true),
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			name: 'pressOptions',
			type: 'object',
			hidden: ({ parent }) => parent?.type !== 'press',
			fields: [
				{
					type: 'boolean',
					name: 'showFilter',
					description: 'Whether the list should include radio buttons for filtering',
					initialValue: false,
				},
			],
		},
		{
			name: 'pages',
			type: 'array',
			hidden: ({ parent }) => parent?.type !== 'page',
			of: [
				{
					type: 'referencePageObject',
					name: 'referencePages',
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			type: 'type',
		},
		prepare: ({ title, type }) => {
			const componentTitle = ['List'];

			if (type) {
				componentTitle.push(type);
			}

			return {
				title: `${title || ''} [${componentTitle.join(' | ')}]`,
			};
		},
	},
};
