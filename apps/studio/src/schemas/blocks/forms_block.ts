import { Rule } from '@sanity/types';
import { AiOutlineForm } from 'react-icons/ai';

import block_options from '../templates/block_options';

export default {
	title: 'Forms',
	name: 'formsBlock',
	type: 'object',
	icon: AiOutlineForm,
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
					title: 'Reversed',
					name: 'reversed',
					type: 'boolean',
					description: 'Set this to "true" if you want the form to be in the left side instead',
					initialValue: false,
				},
			],
		},
		{
			type: 'object',
			name: 'options',
			title: 'Form Options',
			description: 'Configuration options for the form',
			options: {
				collapsible: true,
				collapsed: false,
			},
			fields: [
				{
					title: 'Type',
					name: 'type',
					type: 'string',
					initialValue: 'demo',
					options: {
						list: ['demo', 'newsletter', 'contact'],
					},
					codegen: { required: true },
					validation: (rule: Rule) => rule.required(),
				},
				{
					title: 'Submit text',
					name: 'submitText',
					type: 'string',
					initialValue: 'Sign up',
					validation: (rule: Rule) => rule.required(),
					codegen: { required: true },
				},
				{
					title: 'Description',
					name: 'description',
					type: 'simpleText',
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
			title: 'Content',
			name: 'content',
			type: 'simpleText',
		},
	],
	preview: {
		select: {
			title: 'title',
			options: 'options',
		},
		prepare: ({ title, options }) => {
			const componentTitle = ['Forms'];

			if (options?.type) {
				componentTitle.push(options.type);
			}

			return {
				title: `${title || ''} [${componentTitle.join(' | ')}]`,
			};
		},
	},
};
