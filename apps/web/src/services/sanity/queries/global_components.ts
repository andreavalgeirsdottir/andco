import { groq } from 'next-sanity';

import { Overwrite } from '@web/types/sanity';

import { Link, link, linkOrLevelGroup, simpleText } from './objects';

export const globalComponentsQuery = groq`{
	"header": *[_type == 'headerDocument'] {
		...,
		menu[] ${linkOrLevelGroup(3)},
		cta ${link}
	},
	"footer": *[_type == 'footerDocument'] {
		...,
		menu[] ${linkOrLevelGroup(3)},
		bottom {
			...,
			menu[] ${link},
			copyright[] ${simpleText}
		}
	}
}`;

export type LevelGroup = {
	_type: 'level';
	title?: string;
	items?: LinksOrLevelsGroup[];
};

export type LinksOrLevelsGroup = Sanity.Keyed<Link | LevelGroup>;

export type ProjectedGlobalComponents = {
	header?: Overwrite<Sanity.Schema.HeaderDocument, { menu?: LinksOrLevelsGroup[]; cta?: Link }>;
	footer?: Overwrite<
		Sanity.Schema.FooterDocument,
		{
			menu?: LinksOrLevelsGroup[];
			bottom?: Overwrite<
				Sanity.Schema.FooterDocument['bottom'],
				{
					menu?: Sanity.Keyed<Link>[];
				}
			>;
		}
	>;
};
