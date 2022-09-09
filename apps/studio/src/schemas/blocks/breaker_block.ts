import { Rule } from '@sanity/types';
import { RiLayoutColumnFill } from 'react-icons/ri';

import { linkValidation } from '../objects/link_object';
import block_options from '../templates/block_options';

export default {
	title: 'Breaker',
	name: 'breakerBlock',
	type: 'object',
	icon: RiLayoutColumnFill,
	fields: [
		{
			...block_options,
			fields: [
				{
					type: 'string',
					name: 'variants',
					initialValue: 'text-left',
					options: {
						list: [
							{ title: 'Left | Text', value: 'text-left' },
							{ title: 'Left | Wide Text', value: 'wide-text-left' },
							{ title: 'Right | Text', value: 'text-right' },
							{ title: 'Right | Wide Text', value: 'wide-text-right' },
						],
						layout: 'radio',
					},
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
			hidden: ({ parent }) => {
				if (['wide-text-left', 'wide-text-right'].includes(parent?.blockOptions?.variants)) {
					return true;
				}

				return false;
			},
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
	],
	preview: {
		select: {
			title: 'title',
			blockOptions: 'blockOptions',
		},
		prepare: ({ title, blockOptions }) => {
			const componentTitle = ['Breaker'];

			if (blockOptions?.variants) {
				componentTitle.push(blockOptions?.variants);
			}

			return {
				title: `${title || ''} [${componentTitle.join(' | ')}]`,
			};
		},
	},
};
