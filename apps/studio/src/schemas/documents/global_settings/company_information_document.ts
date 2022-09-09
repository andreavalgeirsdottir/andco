import { Rule } from '@sanity/types';
import { FaRegAddressBook } from 'react-icons/fa';

/**
 * Company information
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	title: 'Company Information',
	name: 'companyInformationDocument',
	description: 'All information globally related to the company (address, phone numbers etc)',
	type: 'document',
	icon: FaRegAddressBook,
	fields: [
		{
			name: 'name',
			type: 'string',
			title: 'Name',
			codegen: { required: true },
			validation: (rule: Rule) => rule.required(),
		},
		{
			name: 'email',
			title: 'Email',
			type: 'string',
			validation: (rule: Rule) => rule.email(),
		},
		{
			name: 'address',
			type: 'addressObject',
			options: {
				collapsed: true,
				collapsible: true,
			},
		},
	],
};
