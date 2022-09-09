import { groq } from 'next-sanity';
import { Overwrite } from 'type-zoo/types';

import { BackgroundColor } from '@apps/web/src/blocks/components/background-color';
import { Inner } from '@apps/web/src/components/utils/inner';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { simpleText } from '@apps/web/src/services/sanity/queries/objects';
import { getBlockId } from '@apps/web/src/utils/block';
import { SimpleText } from '@web/components/simpletext/simpletext';

import styles from './simpletext-block.module.scss';

export interface SimpleTextBlockProps {
	block: Sanity.Keyed<
		Overwrite<
			Sanity.Schema.SimpleTextBlock,
			{
				richtext: Sanity.Block[];
			}
		>
	>;
}

export function SimpleTextBlock({ block }: SimpleTextBlockProps) {
	const { _type, simpletext, blockOptions } = block;

	return (
		<BackgroundColor
			id={getBlockId(block)}
			backgroundColor={blockOptions?.backgroundColor}
			className={styles.simpleTextBlock}
			tag="section"
		>
			<Inner size="small">
				<SimpleText textBlocks={simpletext} />
			</Inner>
		</BackgroundColor>
	);
}

SimpleTextBlock.groq = blockGroq({
	query: groq`{
	...,
	simpletext[] ${simpleText},
}`,
});
