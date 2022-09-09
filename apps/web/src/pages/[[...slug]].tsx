import { isEmpty, values } from 'lodash';
import { GetStaticPaths, GetStaticPropsContext, GetStaticPropsResult } from 'next';

import { useInitGtm } from '@noa/service-tracking';
import { Preview } from '@noa/studio-ui';

import Config from '@apps/web/src/config';
import { fetchSanityData, fetchSanitySlugs } from '@apps/web/src/services/sanity/fetch';
import { buildRelativeLink } from '@apps/web/src/services/sanity/mappings';
import Page from '@web/layouts/page';
import { GlobalContextProvider } from '@web/layouts/page/context';
import { buildLinkForEdit, pickDraft, usePreviewSubscription } from '@web/services/sanity/helpers';
import {
	globalComponentsQuery,
	ProjectedGlobalComponents,
} from '@web/services/sanity/queries/global_components';
import { globalSettingsQuery, ProjectedGlobalSettings } from '@web/services/sanity/queries/global_settings';

import {
	DocumentTypeMap,
	mapSlugToDocumentType,
	TemplateComponent,
	TemplateKey,
	TemplateMap,
	templates,
} from '../templates';

type BaseType<T extends TemplateKey = TemplateKey> = {
	preview: boolean;
	docType: T;
	queryParams: {
		slug: string;
	};
	globalSettings: ProjectedGlobalSettings;
	globalComponents: ProjectedGlobalComponents;
	sanityData: T extends keyof DocumentTypeMap ? DocumentTypeMap[T] : never;
};

export function Index({
	docType,
	sanityData,
	queryParams,
	preview,
	globalSettings,
	globalComponents,
}: BaseType) {
	useInitGtm(globalSettings?.tracking?.gtm.value, { enable: true });

	const { query, params } = templates[docType]?.groq || {};

	const dataSubscription = usePreviewSubscription<TemplateMap[typeof docType]>(query, {
		params: { ...queryParams, ...params } ?? {},
		initialData: sanityData,
		enabled: preview,
	});

	const data = pickDraft<TemplateMap[typeof docType]>(dataSubscription.data, preview);

	const globalComponentsSubscription = usePreviewSubscription<ProjectedGlobalComponents>(
		globalComponentsQuery,
		{
			params: { ...queryParams, ...params } ?? {},
			initialData: globalComponents,
			enabled: preview,
		},
	);

	const globalComponentsOrDraft = pickDraft<ProjectedGlobalComponents>(
		globalComponentsSubscription.data,
		preview,
	);

	const globalSettingsSubscription = usePreviewSubscription<ProjectedGlobalSettings>(globalSettingsQuery, {
		params: { ...queryParams, ...params } ?? {},
		initialData: globalSettings,
		enabled: preview,
	});

	const globalSettingsOrDraft = pickDraft<ProjectedGlobalSettings>(globalSettingsSubscription.data, preview);
	const Component: TemplateComponent<TemplateMap[typeof docType]> = templates[docType].component;

	return (
		<GlobalContextProvider globalComponents={globalComponentsOrDraft} globalSettings={globalSettingsOrDraft}>
			<Page pageData={data as TemplateMap[TemplateKey]}>
				<Component pageData={data as TemplateMap[TemplateKey]} />
				{preview && (
					<Preview
						editUrl={buildLinkForEdit(docType, {
							pageId: data?._id,
							locked_slug: data?.options?.locked_slug,
						})}
						redeployUrl={Config.VERCEL_REDEPLOY_URL}
					/>
				)}
			</Page>
		</GlobalContextProvider>
	);
}

export async function getStaticProps({
	preview = false,
	params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<BaseType>> {
	const slug = normalizeSlug(params?.slug);
	const slugMap = mapSlugToDocumentType(slug, { lang: 'en' });
	const { globalComponents, globalSettings, pageData } = await fetchSanityData(slugMap, preview);
	const catchAllSlugs = globalSettings?.catchAllSlugs?.slugs;

	// If there's no data from any of the data services
	if (isEmpty(pageData)) {
		// If there's been Catch All Slugs defined in the Studio
		if (!isEmpty(catchAllSlugs)) {
			// Iterate over the catch all slugs, and see if there's any match
			const redirectUrlFromCatchSlug = catchAllSlugs.find((slugToCatch) => {
				return slugToCatch.catchSlug?.some((s) => new RegExp(s).test(slugMap.queryParams.slug));
			});

			// If there's a match, then redirect to that slug
			if (redirectUrlFromCatchSlug?.redirect?.slug) {
				return {
					redirect: {
						destination: buildRelativeLink('page', redirectUrlFromCatchSlug.redirect.slug),
						permanent: false,
					},
					revalidate: 60,
				};
			}
		}

		// If the 404 page is defined in the Studio, then redirect to that page
		if (slugMap.queryParams.slug !== 'error/404') {
			return {
				revalidate: 60,
				redirect: {
					destination: '/error/404',
					permanent: false,
				},
			};
		}

		// Else mark as not found
		return {
			revalidate: 60,
			notFound: true,
		};
	}

	// If we're here, it means there's data from minimum one of the services and it's considered a valid slug.
	return {
		props: {
			preview,
			docType: slugMap?.docType,
			queryParams: slugMap?.queryParams,
			globalSettings,
			globalComponents,
			sanityData: pickDraft(pageData, preview),
		},
		revalidate: false,
	};
}

function normalizeSlug(slug: undefined | string | string[]): string[] {
	if (!slug) {
		return [];
	}

	return Array.isArray(slug) ? slug : [slug];
}

export const getStaticPaths: GetStaticPaths = async () => {
	const sanitySlugs = await fetchSanitySlugs();
	const slugs = [...(values(sanitySlugs)?.flat() || [])];

	// Split the slug strings to arrays (as required by Next.js)
	const paths = slugs.reduce((collector, { slug }) => {
		return [
			...collector,
			{
				params: {
					slug: slug?.split('/').filter((p) => p),
				},
			},
		];
	}, [] as { params: { slug: string[] }; locale: string }[]);

	return {
		paths,
		fallback: 'blocking',
	};
};

export default Index;
