import { AiOutlineTable } from 'react-icons/ai';
import { v4 } from 'uuid';

import { arrayFromNumber } from '../../../../../libs/utils/common/src';
import block_options from '../templates/block_options';

export default {
	title: 'Table',
	name: 'tableBlock',
	type: 'object',
	icon: AiOutlineTable,
	fields: [
		{
			...block_options,
			fields: [
				{
					type: 'boolean',
					name: 'firstRowAsHeader',
					title: 'Use the first row as header',
					description: 'Set this to active to use the first row as header',
					initialValue: true,
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
			title: 'Subtitle',
			name: 'subtitle',
			type: 'simpleText',
		},
		{
			type: 'table',
			name: 'table',
			initialValue: {
				rows: arrayFromNumber(5).map(() => ({
					_type: 'tableRow',
					_key: v4(),
					cells: ['', ''],
				})),
			},
		},
	],
	preview: {
		select: {
			title: 'title',
		},
		prepare: ({ title }) => {
			const componentTitle = ['Table'];

			if (title) {
				return {
					title: `${title || ''} [${componentTitle.join(' | ')}]`,
				};
			}

			return {
				title: `[${componentTitle.join(' | ')}]`,
			};
		},
	},
};
