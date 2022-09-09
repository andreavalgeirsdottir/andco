import { Rule } from '@sanity/types/dist/dts';
import { AiOutlineLink } from 'react-icons/ai';

import Link, { linkValidation } from './link';

export default {
	title: 'Inline Link',
	name: 'inlineLink',
	icon: AiOutlineLink,
	type: 'object',
	initialValue: { type: 'internal' },
	validation: (rule: Rule) => linkValidation(rule, { title: true }),
	fields: Link.fields.filter((l) => l.name !== 'title'),
	preview: {
		select: {
			title: 'title',
			type: 'type',
		},
		prepare: ({ title, type }) => ({
			title,
			subtitle: `${type[0].toUpperCase()}${type.substring(1)} link`,
		}),
	},
};
