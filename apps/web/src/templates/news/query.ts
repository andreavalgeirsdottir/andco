import { groq } from 'next-sanity';

import { ContentBlock } from '@apps/web/src/blocks/content-block/content-block';
import { MediaBlock } from '@apps/web/src/blocks/media-block/media-block';
import { MediaProps } from '@apps/web/src/components/media/media';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { SEO, seo } from '@web/services/sanity/queries/objects';
import { Overwrite } from '@web/types/sanity';

/**
 * If the slug is equals to `news/news`, then we'll fetch all of the news
 */
export const newsQuery = blockGroq({
	query: groq`
*[(_type == 'news' && "news/news/" + slug.current == $slug) ] {
  _type == "news" => {
    ...,
		"seo": seo ${seo},
		content[] ${ContentBlock.groq.query},
		media ${MediaBlock.groq.query},
  },
}`,
	params: ContentBlock.groq.params,
});

export type ProjectedNews = Overwrite<
	Sanity.Schema.News,
	{
		seo: SEO;
		media?: MediaProps['media'];
	}
>;
