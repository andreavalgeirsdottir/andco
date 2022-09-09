import { Rule } from '@sanity/types';
import { AiOutlinePicCenter } from 'react-icons/ai';

import { linkValidation } from '../objects/link_object';
import block_options from '../templates/block_options';

export default {
	title: 'Hero',
	name: 'heroBlock',
	type: 'object',
	icon: AiOutlinePicCenter,
	fields: [
		{
			...block_options,
			fields: [
				{
					type: 'string',
					name: 'titleColor',
					initialValue: 'white',
					options: {
						list: ['white', 'blue'],
						layout: 'radio',
					},
				},
			],
		},
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: (rule: Rule) => rule.required().max(100),
			codegen: { required: true },
		},
		{
			title: 'Content',
			name: 'content',
			type: 'simpleText',
		},
		{
			title: 'CTA',
			name: 'cta',
			type: 'link',
			validation: (rule: Rule) => linkValidation(rule, true),
			description: 'Call to action button',
		},
		{
			type: 'media',
			name: 'backgroundImage',
			title: 'Background Media',
			validation: (rule: Rule) => rule.required(),
			codegen: { required: true },
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		{
			type: 'media',
			name: 'foregroundImage',
			title: 'Foreground Media',
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: ({ title }) => {
			const componentTitle = ['Hero'];

			return {
				title: `${title || ''} [${componentTitle.join(' | ')}]`,
			};
		},
	},
};
