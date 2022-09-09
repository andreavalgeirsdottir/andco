import { Rule } from '@sanity/types';

export default {
	title: 'SEO metadata',
	type: 'object',
	name: 'seo',
	options: {
		collapsible: true,
		collapsed: true,
	},
	fields: [
		{
			title: 'Title',
			name: 'metaTitle',
			type: 'string',
			description:
				'The title that will be used on google search results, and when sharing a link to the page',
		},
		{
			title: 'Keywords',
			name: 'keywords',
			type: 'string',
			description: 'Which keywords are important on this page? They should be seeprated, with, commas',
		},
		{
			title: 'Synonyms',
			name: 'synonyms',
			type: 'string',
			description: 'Similar words tro inform the SEO Review',
		},
		{
			title: 'Page Type',
			name: 'pageType',
			type: 'string',
			description: '"website", or "article"',
		},
		{
			title: 'Description',
			name: 'metaDescription',
			type: 'text',
			description:
				'The description that will be used on google search results, and when sharing a link to the page',
			validation: (rule: Rule) => rule.max(155).warning('Should be less than 155 characters'),
		},
		{
			title: 'Image',
			name: 'image',
			description:
				// eslint-disable-next-line max-len
				'The image that will be used when sharing a link to the page. Recommended width: 1200px height: 630px (will be auto resized)',
			type: 'image',
		},
	],
};
