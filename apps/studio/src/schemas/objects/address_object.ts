import { Rule } from '@sanity/types';

import countries from '../../../../../libs/studio/types/src/lib/countries';

export default {
	title: 'Address',
	name: 'addressObject',
	description: 'Physical company address',
	type: 'object',
	fields: [
		{
			title: 'Street',
			name: 'street',
			type: 'string',
			codegen: { required: true },
			validation: (rule: Rule) => rule.required(),
		},
		{
			title: 'Zip',
			name: 'zipCode',
			type: 'string',
			codegen: { required: true },
			validation: (rule: Rule) => rule.required(),
		},
		{
			title: 'City',
			name: 'city',
			type: 'string',
			codegen: { required: true },
			validation: (rule: Rule) => rule.required(),
		},
		{
			title: 'Country',
			name: 'country',
			type: 'string',
			options: {
				list: [...countries],
			},
			codegen: { required: true },
			validation: (rule: Rule) => rule.required(),
		},
	],
};
