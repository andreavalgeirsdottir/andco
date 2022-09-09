import { BsCardText } from 'react-icons/bs';

import { innerWidth } from '../../../../../libs/studio/blocks/src';
import block_options from '../templates/block_options';

export default {
	title: 'Rich Text',
	name: 'richTextBlock',
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
				{
					type: 'string',
					name: 'innerWidth',
					title: 'Container width',
					description: 'The width of the container',
					initialValue: 'small',
					options: {
						list: innerWidth,
						layout: 'radio',
					},
				},
			],
		},
		{
			name: 'title',
			type: 'string',
			description: 'This also generates a divider between the title and rich text',
		},
		{
			name: 'richtext',
			type: 'richText',
		},
	],
	preview: {
		select: {
			title: 'title',
			richtext: 'richtext',
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		prepare(value: { richtext: any[]; title: string }) {
			const block = (value.richtext || []).find((e) => e._type === 'block');

			return {
				title: `${
					block
						? block.children
								.filter((child) => child._type === 'span')
								.map((span) => span.text)
								.join('')
						: value?.title || 'No title'
				} [RichText]`,
			};
		},
	},
};
