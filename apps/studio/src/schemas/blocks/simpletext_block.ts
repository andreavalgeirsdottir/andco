import { BsCardText } from 'react-icons/bs';

import block_options from '../templates/block_options';

export default {
	title: 'Simple Text',
	name: 'simpleTextBlock',
	type: 'object',
	icon: BsCardText,
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
			name: 'simpletext',
			type: 'simpleText',
		},
	],
	preview: {
		select: {
			simpletext: 'simpletext',
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		prepare(value: { simpletext: any[] }) {
			const block = (value.simpletext || []).find((e) => e._type === 'block');

			return {
				title: block
					? block.children
							.filter((child) => child._type === 'span')
							.map((span) => span.text)
							.join('')
					: 'No title',
			};
		},
	},
};
