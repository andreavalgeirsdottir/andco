import { Rule } from '@sanity/types/dist/dts';
import { GrMultiple } from 'react-icons/gr';

import { readonlyWhenLockedSlug } from '../../objects/locked_slug_object';

/**
 * Page
 *
 * References
 * - https://www.sanity.io/docs/schema-types
 */
export default {
	title: 'Page',
	name: 'page',
	type: 'document',
	icon: GrMultiple,
	filter: '_type == "page" && options.locked_slug != true',
	groups: [
		{
			name: 'content',
			title: 'Content',
		},
		{
			name: 'options',
			title: 'Options',
		},
		{
			name: 'seo',
			title: 'SEO',
		},
	],
	fields: [
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			validation: (rule: Rule) => rule.required(),
			codegen: { required: true },
			description: 'The slug (URL) that is used to identify the page',
			defaultValue: 'title',
			group: 'content',
			options: {
				source: 'title',
				maxLength: 96,
			},
			...readonlyWhenLockedSlug,
		},
		{
			title: 'Content',
			name: 'content',
			type: 'contentBlock',
			description: 'The Content Blocks of the page.',
			codegen: { required: true },
			group: 'content',
		},
		{
			title: 'SEO',
			name: 'seo',
			description: 'These values populate meta tags',
			type: 'seo',
			group: 'seo',
			codegen: { required: true },
		},
		{
			title: 'Options',
			type: 'object',
			name: 'options',
			group: 'options',
			description: 'Configuration for the page',
			options: {
				collapsable: true,
				collapsed: true,
			},
			fields: [
				{
					title: 'Release date',
					name: 'releaseDate',
					type: 'dateObject',
					description: 'The date the page was released',
					validation: (rule: Rule) => rule.optional(),
					codegen: { required: false },
					initialValue: null,
				},
				{
					name: 'locked_slug',
					title: 'Lock Page',
					type: 'lockedSlugObject',
					initialValue: false,
				},
				{
					type: 'boolean',
					name: 'excludeFromSearch',
					title: 'Exclude from search',
					description: "Set this to true, if you don't want this page to be part of the search results",
					initialValue: false,
				},
			],
		},
	],
	preview: {
		select: {
			slug: 'slug.current',
		},
		prepare: ({ slug }) => {
			if (slug === '/') {
				return { title: 'frontpage' };
			}

			return { title: slug };
		},
	},
};
