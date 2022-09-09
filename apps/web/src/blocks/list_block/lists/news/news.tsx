import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { groq } from 'next-sanity';
import React from 'react';
import { useQuery } from 'react-query';

import { CardList, CardListProps } from '@noa/ui';
import { FORMATS } from '@noa/utils-date';

import { BlockHeader } from '@apps/web/src/blocks/components/block-header';
import { ListBlockProps } from '@apps/web/src/blocks/list_block/list_block';
import { Inner } from '@apps/web/src/components/utils/inner';
import { getClient } from '@apps/web/src/services/sanity/client';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { buildRelativeLink, hrefFromLink } from '@apps/web/src/services/sanity/mappings';
import { ProjectedNews } from '@apps/web/src/templates/news/query';

import styles from './news.module.scss';

type Props = {} & ListBlockProps;

export const ListBlockNews = ({ block }: Props) => {
	const { type, blockOptions } = block;

	const fetchList = async () => {
		const response = await getClient(true).fetch<Sanity.Keyed<ProjectedNews>[]>(ListBlockNews.groq.query, {
			...ListBlockNews.groq.params,
			limit: blockOptions?.limit || 3,
		});

		return response
			.map<CardListProps['list'][number]>((item) => ({
				id: item._id,
				title: dayjs(item?.options?.releaseDate || item?._updatedAt).format(FORMATS.human),
				content: item?.seo?.metaTitle || item?.slug?.current,
				href: buildRelativeLink(type, item.slug.current),
			}))
			.filter((item) => !!item?.title || !!item.content);
	};

	const {
		data: list,
		isFetched,
		isFetching,
	} = useQuery({
		queryKey: ['list_block', type, blockOptions?.limit],
		queryFn: fetchList,
	});

	return (
		<>
			{block.title && (
				<Inner size="large" className={styles.headerInner}>
					<BlockHeader
						isFetching={isFetching}
						title={block.title}
						cta={block?.cta?.url ? { href: hrefFromLink(block.cta), children: block.cta.title } : undefined}
					/>
				</Inner>
			)}
			<Inner size="medium" className={styles.listInner}>
				{isFetched &&
					(!isEmpty(list) ? (
						<CardList className={styles.cardList} list={list} size="small" />
					) : (
						<h5 className={styles.empty}>{blockOptions?.fallbackText || "Sorry, but it's all empty here"}</h5>
					))}
			</Inner>
		</>
	);
};

ListBlockNews.groq = blockGroq({
	query: groq`*[_type == $type][0...$limit] | order(releaseDate desc) {
		...,
	}`,
	params: {
		type: 'news',
		limit: 3,
	},
});
