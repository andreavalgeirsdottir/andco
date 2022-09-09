import { groq } from 'next-sanity';

import { arrayFromNumber } from '@noa/utils-common';

import { TemplateKey } from '@web/templates';
import { Overwrite } from '@web/types/sanity';

import { SanityFile, SanityImage } from './types';

export const fileQuery = groq`{
	...,
	"file": file.asset ->
}`;

export type File = Overwrite<Sanity.Schema.FilesObject[number], { file: SanityFile }>;

export const link = groq`{
	...,
	"url": select(
		type == "mailto" => mailto ->,
		type == "file" => file.asset ->,
		type == "internal" => internalLink -> { "slug": slug.current, "type": _type },
		type == "external" => externalLink
	)
}`;

export type InternalLink = {
	_type: 'link';
	type: 'internal';
	url: { slug: string | null; type: TemplateKey };
	title: string;
	anchor?: string;
};

export type ExternalLink = {
	_type: 'link';
	type: 'external';
	url: string;
	title: string;
};

export type Mailto = { _type: 'link'; type: 'mailto'; url: Sanity.Schema.Employee; title: string };

export type Asset = {
	_type: 'link';
	type: 'file';
	url: SanityFile;
	title: string;
	file?: { _type: 'file'; asset: Sanity.File['asset'] };
};

export type Link = InternalLink | ExternalLink | Mailto | Asset;

export const linkOrLevel = (item?: string) => groq`{
	...,
	_type == 'level' => {
		...,
		items[] ${item || '{ ... }'},
	},
	_type == 'link' => ${link}
}`;

/**
 * @warning This is recursive - Make sure to only add the {@link levels} you need as
 * it quickly can grow into a large and slow SQL query.
 *
 * @param levels The number of levels the menu should support
 */
export const linkOrLevelGroup = (levels: number) =>
	groq`${arrayFromNumber(levels).reduce((acc) => linkOrLevel(acc), '')}`;

export const seo = groq`{
	...,
	"image": image {
		...,
		"asset": asset->
	}
}`;

export type SEO = Overwrite<
	Sanity.Schema.Seo,
	{
		image: SanityImage;
	}
>;

export const simpleText = groq`{
	...,
	_type == 'block' => {
		...,
		markDefs [] {
			...,
			_type == 'link' => ${link}
		}
	}
}`;

export const richText = groq`{
	...,
	_type == 'button' => {
		...,
		link ${link}
	},
	_type == 'image' => {
		...,
		"asset": asset->
	},
	_type == 'block' => {
		...,
		markDefs [] {
			...,
			_type == 'link' => ${link}
		}
	}
}`;
