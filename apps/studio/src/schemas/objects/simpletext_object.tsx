import { Block } from '@sanity/types/dist/dts';
import React from 'react';
import { AiOutlineAlignCenter } from 'react-icons/ai';
import { GrTextAlignFull } from 'react-icons/gr';

export default {
	title: 'Simple Text',
	name: 'simpleText',
	icon: GrTextAlignFull,
	type: 'array',
	of: [
		{
			type: 'block',
			marks: {
				decorators: [
					{ title: 'Strong', value: 'strong' },
					{ title: 'Emphasis', value: 'em' },
					{ title: 'Underline', value: 'underline' },
					{ title: 'Strike', value: 'strike-through' },
					{ title: 'Code', value: 'code' },
					{
						title: 'Centered',
						value: 'center',
						blockEditor: {
							icon: AiOutlineAlignCenter,
							render: ({ children }) => <div style={{ textAlign: 'center' }}>{children}</div>,
						},
					},
					{
						title: 'Sup',
						value: 'sup',
						blockEditor: {
							icon: () => (
								<div>
									x<sup>2</sup>
								</div>
							),
							render: ({ children }) => <sup>{children}</sup>,
						},
					},
				],
				annotations: [
					{
						name: 'link',
						type: 'inlineLink',
						title: 'Link',
					},
				],
			},
			styles: [
				{ title: 'Normal', value: 'normal' },
				{
					title: 'Small',
					value: 'small',
					blockEditor: {
						render: ({ children }) => <span style={{ fontSize: '14px' }}>{children}</span>,
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
