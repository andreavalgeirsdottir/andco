import Head from 'next/head';

import { isType } from '@noa/utils-common';

import { TemplateKey } from '@apps/web/src/templates';
import { Slug } from '@apps/web/src/types/sanity';
import config from '@web/config';
import { buildRelativeLink } from '@web/services/sanity/mappings';

import { useGlobalContext, usePageContext } from './context';

export function SeoTags() {
	const { pageData } = usePageContext();
	const { globalSettings } = useGlobalContext();
	const title = pageData?.seo?.metaTitle || globalSettings?.siteInformation?.title;
	const metaDescription = pageData?.seo?.metaDescription || globalSettings?.seo?.metaDescription;
	const metaImage = pageData?.seo?.image || globalSettings?.seo?.image;
	const pageType = pageData?.seo?.pageType || globalSettings?.seo?.pageType;
	const type = pageData?._type;

	const relativeUrl = buildRelativeLink(
		type,
		isType<{ slug: Slug }>(pageData, (p) => !!p.slug) ? pageData?.slug?.current : getLinkPrefixMapping(type),
	);

	return (
		<Head>
			{title && (
				<>
					<title>{title}</title>
					<meta name="title" content={title} />
				</>
			)}
			{metaDescription && (
				<>
					<meta name="description" content={metaDescription} />
					<meta property="og:description" content={metaDescription} />
				</>
			)}
			<meta property="og:type" content={pageType || 'website'} />
			<meta property="og:url" content={config.BASE_URL + relativeUrl} />
			<link rel="canonical" href={config.BASE_URL + relativeUrl} />
			{metaImage && <meta property="og:image" content={metaImage.asset.url} />}
		</Head>
	);
}

function getLinkPrefixMapping(type: TemplateKey) {
	if (type === 'news') {
		return 'news';
	}

	console.error(`not implemented: ${type}`);
}
