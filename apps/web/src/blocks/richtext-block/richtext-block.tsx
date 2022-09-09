import { groq } from 'next-sanity';
import { Overwrite } from 'type-zoo/types';

import { getTestAttr } from '@noa/service-testing';

import { BackgroundColor } from '@apps/web/src/blocks/components/background-color';
import { Inner } from '@apps/web/src/components/utils/inner';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { richText } from '@apps/web/src/services/sanity/queries/objects';
import { getBlockId } from '@apps/web/src/utils/block';
import { Richtext } from '@web/components/richtext/richtext';

import styles from './richtext-block.module.scss';

export interface RichTextBlockProps {
	block: Sanity.Keyed<
		Overwrite<
			Sanity.Schema.RichTextBlock,
			{
				richtext: Sanity.Block[];
			}
		>
	>;
}

export function RichTextBlock({ block }: RichTextBlockProps) {
	const { richtext, title, blockOptions } = block;

	return (
		<BackgroundColor
			id={getBlockId(block)}
			backgroundColor={blockOptions?.backgroundColor}
			className={styles.richTextBlock}
			tag="section"
			{...getTestAttr('block_richTextBlock')}
		>
			<Inner size={blockOptions?.innerWidth || 'small'}>
				{title && (
					<>
						<h3 className={styles.title}>{title}</h3>
						<hr className={styles.hr} />
					</>
				)}
				<Richtext textBlocks={richtext} />
			</Inner>
		</BackgroundColor>
	);
}

RichTextBlock.groq = blockGroq({
	query: groq`{
	...,
	richtext[] ${richText},
}`,
});
