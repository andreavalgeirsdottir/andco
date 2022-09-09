import { Rule } from '@sanity/types';
import { BsArrowsCollapse } from 'react-icons/bs';

import block_options from '../templates/block_options';

export default {
	title: 'Accordion',
	name: 'accordionBlock',
	type: 'object',
	icon: BsArrowsCollapse,
	fields: [
		{
			...block_options,
			fields: [
				{
					title: 'Multiple items open simultaneously',
					name: 'multiple',
					type: 'boolean',
					initialValue: false,
				},
				{
					type: 'backgroundColorObject',
					name: 'backgroundColor',
					initialValue: {
						color: 'none',
					},
				},
			],
		},
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: (rule: Rule) => rule.required(),
			codegen: { required: true },
		},
		{
			title: 'Subtitle',
			name: 'subtitle',
			type: 'simpleText',
		},
		{
			name: 'items',
			type: 'array',
			of: [
				{
					name: 'item',
					type: 'object',
					title: 'Item',
					fields: [
						{
							type: 'string',
							title: 'Title',
							name: 'title',
							validation: (rule: Rule) => rule.required(),
							codegen: { required: true },
						},
						{
							title: 'Content',
							name: 'content',
							type: 'richText',
							validation: (rule: Rule) => rule.required(),
							codegen: { required: true },
						},
						{
							title: 'Is default open?',
							name: 'defaultOpen',
							type: 'boolean',
						},
					],
					preview: {
						select: {
							title: 'title',
							defaultOpen: 'defaultOpen',
						},
						prepare: ({ title, defaultOpen }) => ({
							title: `${title || ''} ${defaultOpen ? '[default open]' : ''}`,
						}),
					},
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: ({ title }) => ({
			title: `${title || ''} [Accordion]`,
		}),
	},
};
