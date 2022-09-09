import { HiOutlineCursorClick } from 'react-icons/hi';

import { trackingGroup } from '../../utils/tracking';

/**
 * Tracking
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	title: 'Global Tracking',
	name: 'tracking',
	type: 'document',
	icon: HiOutlineCursorClick,
	fields: [
		trackingGroup({
			id: 'gtm',
			title: 'GTM',
			description: 'Configuration for Google Tag Manager',
			options: {
				collapsed: false,
			},
			inputProps: {
				initialValue: 'GTM-',
				title: 'ID',
				description: 'Should include the "GTM-" part',
			},
		}),
	],
};
