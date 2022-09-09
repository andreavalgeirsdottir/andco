import { groq } from 'next-sanity';

import { ContentBlock, ContentBlockProps } from '@apps/web/src/blocks/content-block/content-block';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { SEO, seo } from '@web/services/sanity/queries/objects';
import { Overwrite } from '@web/types/sanity';

export const pageQuery = blockGroq({
	query: groq`
*[_type == 'page' && slug.current == $slug] {
	...,
	"seo": seo ${seo},
	content[] ${ContentBlock.groq.query},
}`,
	params: ContentBlock.groq.params,
});

export type ProjectedPage = Overwrite<
	Sanity.Schema.Page,
	{
		content: ContentBlockProps['blocks'];
		seo: SEO;
	}
>;
