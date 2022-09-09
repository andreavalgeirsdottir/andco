import { Block } from '@sanity/types/dist/dts';
import { AiOutlinePicture } from 'react-icons/ai';
import { GrTextWrap } from 'react-icons/gr';

import block_options from '../templates/block_options';
import simpleText from './simpletext_object';

const simpleTextBlock = simpleText.of.find((d) => d.type === 'block');

export default {
	title: 'Rich Text',
	name: 'richText',
	icon: GrTextWrap,
	type: 'array',
	of: [
		{
			type: 'block',
			marks: {
				decorators: [...simpleTextBlock.marks.decorators],
				annotations: [...simpleTextBlock.marks.annotations],
			},
			styles: [
				...simpleTextBlock.styles,
				{ title: 'Heading 2', value: 'h2' },
				{ title: 'Heading 3', value: 'h3' },
				{ title: 'Heading 4', value: 'h4' },
				{ title: 'Heading 5', value: 'h5' },
				{ title: 'Heading 6', value: 'h6' },
				{ title: 'Quote', value: 'blockquote' },
			],
		},
		{
			type: 'buttonObject',
			name: 'button',
		},
		{
			type: 'image',
			icon: AiOutlinePicture,
			fields: [
				{
					...block_options,
					options: {
						isHighlighted: true,
					},
					fields: [
						{
							type: 'boolean',
							name: 'widerThanText',
							initialValue: true,
						},
						{
							type: 'string',
							name: 'alignment',
							initialValue: 'left',
							options: {
								layout: 'radio',
								list: ['left', 'center', 'right'],
							},
						},
					],
				},
				{
					type: 'text',
					name: 'alt',
					title: 'Alternative Text',
					options: {
						isHighlighted: true,
					},
				},
			],
		},
	],
	preview: {
		select: {
			blocks: 'blocks',
		},
		prepare(value: { blocks: Block[] }) {
			const block = (value.blocks || []).find((e) => e._type === 'block');

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
