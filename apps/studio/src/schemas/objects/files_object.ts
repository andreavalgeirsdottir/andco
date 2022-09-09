import { Rule } from '@sanity/types';
import { AiOutlineFile } from 'react-icons/ai';

export default {
	title: 'Files',
	name: 'filesObject',
	type: 'array',
	icon: AiOutlineFile,
	of: [
		{
			type: 'object',
			name: 'item',
			fields: [
				{
					title: 'Name',
					name: 'name',
					type: 'string',
					validation: (rule: Rule) => rule.required(),
					codegen: { required: true },
				},
				{
					type: 'file',
					name: 'file',
					options: {
						accept: 'application/pdf',
					},
					validation: (rule: Rule) => rule.required(),
					codegen: { required: true },
				},
			],
		},
	],
};
