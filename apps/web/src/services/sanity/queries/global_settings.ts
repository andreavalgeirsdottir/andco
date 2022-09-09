import { groq } from 'next-sanity';
import { Overwrite } from 'type-zoo/types';

import { scheme, Theme } from '@noa/theme';

import { SEO } from '@apps/web/src/services/sanity/queries/objects';
import { SanityImage } from '@apps/web/src/services/sanity/queries/types';

const colorSchemeAssets = scheme.reduce((acc, s) => {
	return `${acc}"${s}": ${s}.asset ->,\n`;
}, '');

export const globalSettingsQuery = groq`{
	"catchAllSlugs": *[_type =="catchAllSlugsDocument"] {
		...,
		slugs[] {
			...,
			redirect -> {
				"slug": slug.current,
				"type": _type
			}
		}
	},
  "tracking": *[_type =="tracking"],
  "seo": *[_type =="globalSeoDocument"],
	"logo": *[_type == "logoWithColorScheme"] {
		...,
		"logoAsset": logo.asset ->,
    "colorSchemeAssets": color_scheme {
			${colorSchemeAssets}
    },
	},
	"siteInformation": *[_type == "siteInformationDocument"],
	"companyInformation": *[_type == "companyInformationDocument"]
}`;

export type ProjectedGlobalSettings = {
	catchAllSlugs: Overwrite<
		Sanity.Schema.CatchAllSlugsDocument,
		{
			slugs?: Overwrite<
				Sanity.Schema.CatchAllSlugsDocument['slugs'][number],
				{ catchSlug: RegExp[]; redirect: { slug: string; type: string } }
			>[];
		}
	>;
	tracking: Sanity.Schema.Tracking;
	seo: SEO;
	logo?: {
		logoAsset: SanityImage['asset'];
		colorSchemeAssets: {
			[colorScheme in keyof Theme['scheme']]: SanityImage['asset'];
		};
	};
	siteInformation?: Sanity.Schema.SiteInformationDocument;
	companyInformation?: Sanity.Schema.CompanyInformationDocument;
};
