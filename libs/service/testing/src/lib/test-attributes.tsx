import { ContentBlocks } from '@noa/studio-blocks';

export type TestIds =
	| 'desktop_menu'
	| 'header_search'
	| 'form'
	| 'search_dialog'
	| 'form_demo'
	| 'form_newsletter'
	| 'form_contact'
	| 'footer'
	| 'header'
	| 'logo'
	| 'mobile_menu'
	| 'nested_navigation'
	| 'template_layout'
	| 'block_contentBlock'
	| `block_${ContentBlocks}`;

export const getTestAttr = (id: TestIds) => {
	return {
		'data-testid': id,
	};
};
