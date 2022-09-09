import { HiOutlineInformationCircle } from 'react-icons/hi';

/**
 * Site information
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	type: 'document',
	name: 'siteInformationDocument',
	title: 'Site information',
	description:
		'Site information like name, subtitle, etc. This will be consumed in different places in the frontend',
	icon: HiOutlineInformationCircle,
	fields: [
		{
			name: 'title',
			title: 'Site Title',
			type: 'string',
		},
		{
			name: 'subtitle',
			title: 'Site Subtitle',
			type: 'string',
		},
	],
};
