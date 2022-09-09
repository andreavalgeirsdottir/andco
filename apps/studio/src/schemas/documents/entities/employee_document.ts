import { Rule } from '@sanity/types';
import { FiUser } from 'react-icons/fi';

/**
 * Employee
 *
 * All information about an employee.
 * This is also used to create mailto links to the employee.
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	title: 'Employee',
	name: 'employee',
	type: 'document',
	filter: '_type == "employee"',
	icon: FiUser,
	fields: [
		{
			title: 'Full name',
			name: 'title',
			type: 'string',
			validation: (rule: Rule) => rule.required(),
			codegen: { required: true },
		},
		{
			title: 'Email',
			name: 'email',
			type: 'string',
			validation: (rule: Rule) => rule.email().required(),
		},
	],
};
