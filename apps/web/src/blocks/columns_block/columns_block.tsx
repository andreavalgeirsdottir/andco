import classnames from 'classnames';
import { motion } from 'framer-motion';
import { groq } from 'next-sanity';
import React from 'react';
import { Overwrite } from 'type-zoo/types';

import { getTestAttr } from '@noa/service-testing';
import { getVariantsClassNames } from '@noa/theme';
import { Button } from '@noa/ui';
import { MOTIONS_VARIANTS } from '@noa/utils-animations';
import { OneOf } from '@noa/utils-common';

import { BackgroundColor } from '@apps/web/src/blocks/components/background-color';
import { BlockHeader } from '@apps/web/src/blocks/components/block-header';
import { MediaBlock } from '@apps/web/src/blocks/media-block/media-block';
import { AspectRatio } from '@apps/web/src/components/media/aspectRatios';
import { Media, MediaProps } from '@apps/web/src/components/media/media';
import { SimpleText } from '@apps/web/src/components/simpletext/simpletext';
import { Inner } from '@apps/web/src/components/utils/inner';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { hrefFromLink } from '@apps/web/src/services/sanity/mappings';
import { Link, link, simpleText } from '@apps/web/src/services/sanity/queries/objects';
import { getBlockId } from '@apps/web/src/utils/block';

import styles from './columns_block.module.scss';

const getVariant = getVariantsClassNames(styles);
const [motionList, motionItem] = MOTIONS_VARIANTS.staggerFade;

export type ColumnsBlockProps = {
	block: Sanity.Keyed<
		Overwrite<
			Sanity.Schema.ColumnsBlock,
			{
				cta?: Link;
				content?: Overwrite<
					OneOf<Sanity.Schema.ColumnsBlock['content']>,
					{
						cta?: Link;
						image?: MediaProps['media'];
					}
				>[];
			}
		>
	>;
	className?: string;
	asGrid?: boolean;
	classNames?: Partial<Record<'content', string>>;
};

export const ColumnsBlock = ({ block, className, classNames, asGrid }: ColumnsBlockProps) => {
	const { title, cta, content, subtitle, blockOptions } = block;
	const _asGrid = asGrid ?? block?.content?.length > 4;

	return (
		<BackgroundColor
			backgroundColor={blockOptions?.backgroundColor}
			className={classnames(
				className,
				styles.columnsBlock,
				{
					[styles.imageRounded]: blockOptions?.imageRounded !== false,
					[styles.asGrid]: _asGrid,
				},
				getVariant('imageSize', blockOptions?.imageSize || 'large'),
			)}
			id={getBlockId(block)}
			tag="section"
			{...getTestAttr('block_columnsBlock')}
		>
			<Inner>
				{title && (
					<BlockHeader
						title={title}
						cta={cta?.url ? { children: cta?.title, href: hrefFromLink(cta) } : undefined}
						subtitle={subtitle}
						className={styles.header}
					/>
				)}
				{content && (
					<motion.section
						{...motionList}
						className={classnames(styles.content, classNames?.content)}
						style={
							{
								'--columns': content.length < 5 && content.length > 1 ? content.length : 2,
							} as React.CSSProperties
						}
					>
						{content.map((item) => (
							<Column key={item._key} {...item} />
						))}
					</motion.section>
				)}
			</Inner>
		</BackgroundColor>
	);
};

ColumnsBlock.groq = blockGroq({
	query: groq`{
	...,
	cta ${link},
	subtitle[] ${simpleText},
	content[] {
		...,
		subtitle[] ${simpleText},
		image ${MediaBlock.groq.query},
		cta ${link}
	}
}`,
	params: {
		...MediaBlock.groq.params,
	},
});

const Column = ({ cta, image, subtitle, title }: OneOf<ColumnsBlockProps['block']['content']>) => {
	return (
		<motion.article className={styles.column} {...motionItem}>
			{image && (
				<Media
					className={styles.image}
					media={image}
					aspectRatio={AspectRatio['1:1']}
					imageProps={{ width: 300, height: 300 }}
				/>
			)}
			{title && <h6 className={styles.title}>{title}</h6>}
			{subtitle && <SimpleText textBlocks={subtitle} className={styles.subtitle} />}
			{cta?.url && cta?.title && (
				<Button
					variant="plain"
					href={hrefFromLink(cta)}
					size="xsmall"
					icon={Button.icons['arrow-right']}
					className={styles.cta}
				>
					{cta.title}
				</Button>
			)}
		</motion.article>
	);
};
