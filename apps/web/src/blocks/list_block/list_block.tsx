import { groq } from 'next-sanity';
import React from 'react';
import { Overwrite } from 'type-zoo/types';

import { getTestAttr } from '@noa/service-testing';
import { RecordRender } from '@noa/utils-next';

import { BackgroundColor } from '@apps/web/src/blocks/components/background-color';
import { ListBlockNews } from '@apps/web/src/blocks/list_block/lists/news/news';
import { ListBlockPage } from '@apps/web/src/blocks/list_block/lists/page/page';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { Link, link } from '@apps/web/src/services/sanity/queries/objects';
import { getBlockId } from '@apps/web/src/utils/block';

import styles from './list_block.module.scss';

export type ListBlockProps = {
	block: Sanity.Keyed<
		Overwrite<
			Sanity.Schema.ListBlock,
			{
				cta?: Link;
			}
		>
	>;
};

export const ListBlock = ({ block }: ListBlockProps) => {
	const { type } = block;

	return (
		<BackgroundColor
			className={styles.listBlock}
			backgroundColor={block?.blockOptions?.backgroundColor}
			id={getBlockId(block)}
			{...getTestAttr('block_listBlock')}
		>
			<RecordRender
				id={type}
				render={{
					page: <ListBlockPage block={block} />,
					news: <ListBlockNews block={block} />,
				}}
			/>
		</BackgroundColor>
	);
};

ListBlock.groq = blockGroq({
	query: groq`{
	...,
	cta ${link},
}`,
});
