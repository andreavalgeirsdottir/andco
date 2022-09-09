import { useMemoKey } from '@noaignite-dk/utils-next';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { groq } from 'next-sanity';
import React from 'react';
import { useQuery } from 'react-query';

import { CardList, CardListProps } from '@noa/ui';
import { FORMATS } from '@noa/utils-date';

import { BlockHeader } from '@apps/web/src/blocks/components/block-header';
import { ListBlockProps } from '@apps/web/src/blocks/list_block/list_block';
import { SimpleText } from '@apps/web/src/components/simpletext/simpletext';
import { Inner } from '@apps/web/src/components/utils/inner';
import { getClient } from '@apps/web/src/services/sanity/client';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { buildRelativeLink, hrefFromLink } from '@apps/web/src/services/sanity/mappings';
import { ProjectedPage } from '@apps/web/src/templates/page/query';

import styles from './page.module.scss';

type Props = {} & ListBlockProps;

export const ListBlockPage = ({ block }: Props) => {
	const { type, blockOptions, pages } = block;
	const pagesKey = useMemoKey(pages);

	const fetchList = async () => {
		const response = await getClient(true).fetch<ProjectedPage[]>(ListBlockPage.groq.query, {
			...ListBlockPage.groq.params,
			limit: blockOptions?.limit,
			refs: pages.flatMap((d) => d.reference._ref),
		});

		return pages
			.map<CardListProps['list'][number]>((page, index) => {
				const item = response.find((d) => d._id === page.reference._ref);
				const { overwrite } = page || {};

				return {
					id: `${item._id}-${index}`,
					title:
						overwrite?.title ||
						(item?.options?.releaseDate ? dayjs(item.options.releaseDate).format(FORMATS.human) : undefined),
					content: overwrite?.subtitle ? <SimpleText textBlocks={overwrite.subtitle} /> : undefined,
					href: buildRelativeLink(type, item?.slug?.current),
				};
			})
			.filter((item) => !!item.title || !!item.content);
	};

	const {
		data: list,
		isFetched,
		isFetching,
	} = useQuery({
		queryKey: ['list_block', type, blockOptions?.limit, pagesKey],
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

ListBlockPage.groq = blockGroq({
	query: groq`*[_id in $refs][0...$limit]{
		...,
	}`,
	params: {
		limit: 3,
	},
});
