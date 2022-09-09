import { groq } from 'next-sanity';
import React from 'react';

import { getTestAttr } from '@noa/service-testing';
import { RecordRender } from '@noa/utils-next';

import { BackgroundColor } from '@apps/web/src/blocks/components/background-color';
import { CookiePolicy } from '@apps/web/src/blocks/custom_block/block_types/cookie_policy/cookie_policy';
import { StockChart } from '@apps/web/src/blocks/custom_block/block_types/modular_finance/stock_chart/stock_chart';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { getBlockId } from '@apps/web/src/utils/block';

import styles from './custom_block.module.scss';

export type CustomBlockProps = {
	block: Sanity.Keyed<Sanity.Schema.CustomBlock>;
};

export const CustomBlock = ({ block }: CustomBlockProps) => {
	return (
		<BackgroundColor
			className={styles.customBlock}
			backgroundColor={block?.blockOptions?.backgroundColor}
			id={getBlockId(block)}
			{...getTestAttr('block_customBlock')}
		>
			<RecordRender
				id={block.type}
				render={{ cookie_policy: <CookiePolicy />, 'mf-stock_chart': <StockChart /> }}
			/>
		</BackgroundColor>
	);
};

CustomBlock.groq = blockGroq({
	query: groq`{
	...,
}`,
});
