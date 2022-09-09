import { AiOutlineCode } from 'react-icons/ai';

export default {
	title: 'Background Color',
	name: 'backgroundColorObject',
	type: 'object',
	icon: AiOutlineCode,
	initialValue: {
		color: 'none',
	},
	fields: [
		{
			title: 'Color',
			name: 'color',
			type: 'string',
			options: {
				list: ['none', 'primary', 'secondary', 'tertiary', 'level-1', 'level-2'],
				layout: 'radio',
			},
		},
	],
};
