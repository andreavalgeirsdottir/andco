import { Rule } from '@sanity/types';
import { AiOutlineCode } from 'react-icons/ai';

import block_options from '../templates/block_options';

export default {
	title: 'Custom',
	name: 'customBlock',
	type: 'object',
	icon: AiOutlineCode,
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
			],
		},
		{
			type: 'string',
			name: 'type',
			title: 'Type',
			description: 'This is custom blocks. Only use this if you know what you are doing.',
			options: {
				list: [
					{
						title: 'Cookie Policy',
						value: 'cookie_policy',
					},
					{
						title: 'Stock Chart [Modular Finance]',
						value: 'mf-stock_chart',
					},
				],
			},
			validation: (rule: Rule) => rule.required(),
			codegen: { required: true },
		},
	],
	preview: {
		select: {
			type: 'type',
		},
		prepare: ({ type }) => {
			const componentTitle = ['Custom'];

			if (type) {
				componentTitle.push(type);
			}

			return {
				title: `[${componentTitle.join(' | ')}]`,
			};
		},
	},
};
