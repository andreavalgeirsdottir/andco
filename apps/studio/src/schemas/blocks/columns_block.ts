import { Rule } from '@sanity/types';
import { FiColumns } from 'react-icons/fi';

import { linkValidation } from '../objects/link';
import block_options from '../templates/block_options';

export default {
	title: 'Columns',
	name: 'columnsBlock',
	type: 'object',
	icon: FiColumns,
	fieldsets: [{ name: 'title', title: 'Title' }],
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
					type: 'string',
					name: 'imageSize',
					title: 'Image Size',
					options: {
						list: ['small', 'medium', 'large', 'xlarge'],
						layout: 'radio',
					},
				},
				{
					type: 'boolean',
					name: 'imageRounded',
					title: 'Rounded image',
					initialValue: true,
				},
			],
		},
		{
			fieldset: 'title',
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			title: 'Subtitle',
			name: 'subtitle',
			type: 'simpleText',
		},
		{
			fieldset: 'title',
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
			type: 'array',
			name: 'content',
			title: 'Content',
			validation: (rule: Rule) => rule.required(),
			of: [
				{
					type: 'object',
					name: 'column',
					title: 'Column',
					fields: [
						{
							type: 'media',
							name: 'image',
							title: 'Image',
						},
						{
							name: 'title',
							title: 'Title',
							type: 'string',
						},
						{
							name: 'subtitle',
							title: 'Subtitle',
							type: 'simpleText',
						},
						{
							name: 'cta',
							title: 'CTA',
							type: 'link',
							validation: (rule: Rule) => linkValidation(rule, true),
						},
					],
				},
			],
		},
	],
	preview: {
		select: {
			title: 'title',
			content: 'content',
		},
		prepare: ({ title, content }) => {
			const componentTitle = ['Columns'];

			if (content.length > 0) {
				componentTitle.push(String(content.length));
			}

			return {
				title: `${title || ''} [${componentTitle.join(' | ')}]`,
			};
		},
	},
};
