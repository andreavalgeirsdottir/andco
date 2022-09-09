export type TestIds =
	| 'desktop_menu'
	| 'header_search'
	| 'form'
	| 'footer'
	| 'header'
	| 'logo'
	| 'template_layout';

export const getTestAttr = (id: TestIds) => {
	return {
		'data-testid': id,
	};
};
