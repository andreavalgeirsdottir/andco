import { Rule } from '@sanity/types';
import dayjs from 'dayjs';
import { AiOutlineRead } from 'react-icons/ai';

import { FORMATS } from '../../objects/date_object';
import page from './page';

/**
 * News
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	...page,
	title: 'News',
	name: 'news',
	icon: AiOutlineRead,
	filter: '_type == "news"',
	initialValue: {
		releaseDate: dayjs(new Date()).format(FORMATS['YYYY-MM-DD']),
	},
	fields: [
		{
			type: 'media',
			name: 'media',
			title: 'Image',
			validation: (rule: Rule) => rule.required(),
			codegen: { required: true },
			group: 'content',
			description: 'The image of the news article that will be used when referencing to the news article.',
			initialValue: {
				type: 'image',
			},
			options: {
				collapsible: true,
				collapsed: true,
			},
		},
		...page.fields,
	],
};
