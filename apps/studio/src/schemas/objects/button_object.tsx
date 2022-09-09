import React from 'react';
import { TbHandClick } from 'react-icons/tb';

import block_options from '../templates/block_options';

const Preview = ({ value }) => {
	if (!value?.link?.title) {
		return <button>Button</button>;
	}

	return <button>{value.link.title}</button>;
};

export default {
	title: 'Button',
	name: 'buttonObject',
	icon: TbHandClick,
	type: 'object',
	fields: [
		{
			...block_options,
			fields: [
				{
					type: 'string',
					name: 'alignment',
					initialValue: 'left',
					options: {
						list: ['left', 'center', 'right'],
						layout: 'radio',
					},
				},
				{
					type: 'string',
					name: 'variant',
					initialValue: 'fill',
					options: {
						list: ['fill', 'stroke'],
						layout: 'radio',
					},
				},
				{
					type: 'string',
					name: 'size',
					initialValue: 'small',
					options: {
						list: ['xsmall', 'small', 'large'],
						layout: 'radio',
					},
				},
			],
		},
		{
			name: 'link',
			type: 'link',
		},
	],
	preview: {
		select: {
			link: 'link',
		},
		component: Preview,
	},
};
