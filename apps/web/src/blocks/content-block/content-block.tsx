import { isFunction } from 'lodash';
import { groq } from 'next-sanity';
import { Param0 } from 'type-zoo/types';

import { getTestAttr } from '@noa/service-testing';
import { ContentBlocks } from '@noa/studio-blocks';
import { entries, OneOf } from '@noa/utils-common';

import { AccordionBlock } from '@apps/web/src/blocks/accordion_block/accordion_block';
import { BreakerBlock } from '@apps/web/src/blocks/breaker_block/breaker_block';
import { ColumnsBlock } from '@apps/web/src/blocks/columns_block/columns_block';
import { ContentBlockProvider } from '@apps/web/src/blocks/content-block/provider';
import { CustomBlock } from '@apps/web/src/blocks/custom_block/custom_block';
import { FormsBlock } from '@apps/web/src/blocks/forms_block/forms_block';
import { HeroBlock } from '@apps/web/src/blocks/hero_block/hero_block';
import { ListBlock } from '@apps/web/src/blocks/list_block/list_block';
import { RichTextBlock } from '@apps/web/src/blocks/richtext-block/richtext-block';
import { TableBlock } from '@apps/web/src/blocks/table_block/table_block';
import { blockGroq, GROQQuery } from '@apps/web/src/services/sanity/groq';

const BlockComponents: Record<
	ContentBlocks,
	| typeof AccordionBlock
	| typeof CustomBlock
	| typeof BreakerBlock
	| typeof ColumnsBlock
	| typeof FormsBlock
	| typeof HeroBlock
	| typeof ListBlock
	| typeof RichTextBlock
	| typeof TableBlock
> = {
	accordionBlock: AccordionBlock,
	customBlock: CustomBlock,
	breakerBlock: BreakerBlock,
	columnsBlock: ColumnsBlock,
	formsBlock: FormsBlock,
	heroBlock: HeroBlock,
	listBlock: ListBlock,
	richTextBlock: RichTextBlock,
	tableBlock: TableBlock,
};

const BlockComponentsEntries = entries(BlockComponents);

export interface ContentBlockProps {
	className?: string;
	blocks: BlockProps['block'][];
}

export function ContentBlock({ blocks, className }: ContentBlockProps) {
	return (
		<div className={className} {...getTestAttr('block_contentBlock')}>
			{blocks.map((block) => (
				<ContentBlockProvider key={block._key} columns={1}>
					<Block block={block} />
				</ContentBlockProvider>
			))}
		</div>
	);
}

const componentQueries = BlockComponentsEntries.map(([key, component]) => {
	if (isFunction(component.groq)) {
		return `_type == "${key}" => ${component.groq.query}`;
	}

	return `_type == "${key}" => ${component.groq.query}`;
}).join(',\n');

ContentBlock.groq = blockGroq({
	query: groq`{
	...,
	${componentQueries}
}`,
	params: BlockComponentsEntries.reduce((acc, [_, component]) => {
		if (component.groq.params) {
			return {
				...(acc || {}),
				...component.groq.params,
			};
		}

		return acc;
	}, {} as GROQQuery['params']),
});

type BlockProps = {
	block: Sanity.Keyed<Param0<OneOf<typeof BlockComponents>>['block']>;
};

function Block({ block }: BlockProps) {
	const BlockComponent = BlockComponents[block._type];

	if (BlockComponent) {
		return <BlockComponent key={block._key} block={block as Param0<BlockProps['block']>} />;
	}

	return <pre style={{ maxWidth: '100%', overflow: 'auto' }}>{JSON.stringify(block, null, 2)}</pre>;
}
