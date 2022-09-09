// lib/sanity.js
import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { createCurrentUserHook, createPreviewSubscriptionHook } from 'next-sanity';

import { entries, pruneArray } from '@noa/utils-common';

import Config from '@apps/web/src/config';
import { Slug } from '@apps/web/src/types/sanity';

import { TemplateKey } from '../../templates';
import { config } from './config';
import { InternalLink } from './queries/objects';

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 * */
export const urlFor = (source: SanityImageSource) => createImageUrlBuilder(config).image(source);

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);

// we do not restrict selects to a single item,
// so that drafts will show up too, if they do we pick those over non drafts
// so initial data and data updates reflect draft document, not published document.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function pickDraft<T extends object>(data: T | T[], preview: boolean): T {
	if (!Array.isArray(data)) {
		// If the data is a collection of drafts, then iterate over them and pick the draft of those
		if (typeof data === 'object') {
			const dataAsEntries = entries(data as T);
			if (dataAsEntries.every(([_, d]) => Array.isArray(d))) {
				return dataAsEntries.reduce(
					(acc, [k, d]) => ({ ...acc, [k]: pickDraft(d as unknown as T, preview) }),
					{} as T,
				);
			}
		}

		return data;
	}

	const prunedData = pruneArray(data);

	if (prunedData.length === 1) {
		return prunedData[0];
	}

	if (preview) {
		return (
			prunedData?.find((item) => (item as { _id?: string })?._id?.startsWith('drafts.')) ||
			prunedData[0] ||
			null
		);
	}

	return prunedData[0] || null;
}

export function buildLinkFromDocumentSlug(docType: TemplateKey, slug: Slug, title: string): InternalLink {
	return {
		_type: 'link',
		type: 'internal',
		title,
		url: {
			type: docType,
			slug: slug.current,
		},
	};
}

export function buildLinkForEdit(
	docType: TemplateKey | undefined,
	options?: {
		locked_slug?: boolean;
		pageId: string | undefined;
	},
): string | undefined {
	if (!docType || !options?.pageId) return undefined;

	const docTypeToSanityId: Record<TemplateKey | 'locked_slug', string> = {
		page: 'pages;pages',
		news: 'pages;news',
		locked_slug: 'pages;lockedPages',
	};

	if (!docTypeToSanityId[docType]) {
		return undefined;
	}

	let type: keyof typeof docTypeToSanityId = docType;
	if (options?.locked_slug) {
		type = 'locked_slug';
	}

	return `${Config.SANITY_URL}/desk/${docTypeToSanityId[type]}${
		options.pageId !== 'frontpage' ? `;${options.pageId}` : ''
	}`;
}
