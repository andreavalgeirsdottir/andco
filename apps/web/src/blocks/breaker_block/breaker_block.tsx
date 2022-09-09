import classNames from 'classnames';
import { groq } from 'next-sanity';
import React from 'react';
import { Overwrite } from 'type-zoo/types';

import { getTestAttr } from '@noa/service-testing';
import { getVariantsClassNames } from '@noa/theme';
import { Button } from '@noa/ui';

import { BackgroundColor } from '@apps/web/src/blocks/components/background-color';
import { MediaBlock } from '@apps/web/src/blocks/media-block/media-block';
import { AspectRatio } from '@apps/web/src/components/media/aspectRatios';
import { Media, MediaProps } from '@apps/web/src/components/media/media';
import { SimpleText } from '@apps/web/src/components/simpletext/simpletext';
import { Inner } from '@apps/web/src/components/utils/inner';
import { MediaQuery } from '@apps/web/src/components/utils/media_query';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { hrefFromLink } from '@apps/web/src/services/sanity/mappings';
import { Link, link, simpleText } from '@apps/web/src/services/sanity/queries/objects';
import { getBlockId } from '@apps/web/src/utils/block';

import styles from './breaker_block.module.scss';

const getVariant = getVariantsClassNames(styles);

export type BreakerBlockProps = {
	block: Sanity.Keyed<
		Overwrite<
			Sanity.Schema.BreakerBlock,
			{
				backgroundImage?: MediaProps['media'];
				foregroundImage?: MediaProps['media'];
				cta?: Link;
			}
		>
	>;
};

export const BreakerBlock = ({ block }: BreakerBlockProps) => {
	const { title, backgroundImage, content, cta, foregroundImage, blockOptions } = block;
	const isBpMOrLarger = MediaQuery.useMediaQuery({ minWidth: styles['bp-m'] });

	const isWideVariant = (
		['wide-text-left', 'wide-text-right'] as Sanity.Schema.BreakerBlock['blockOptions']['variants'][]
	).includes(blockOptions?.variants);

	return (
		<BackgroundColor
			backgroundColor={blockOptions?.backgroundColor}
			className={classNames(styles.breakerBlock, getVariant('variant', blockOptions?.variants), {
				[styles.hasForegroundImage]: !!Media.hasMedia(foregroundImage),
			})}
			id={getBlockId(block)}
			{...getTestAttr('block_breakerBlock')}
			tag="section"
		>
			<Inner className={styles.inner}>
				<div className={styles.content}>
					{title && <h6 className={styles.title}>{title}</h6>}
					{content && <SimpleText textBlocks={content} className={styles.simpleText} />}
					{cta?.url && cta.title && (
						<Button
							variant="stroke-primary"
							href={hrefFromLink(cta)}
							icon={Button.icons['arrow-right']}
							className={styles.cta}
						>
							{cta.title}
						</Button>
					)}
				</div>
			</Inner>
			{foregroundImage && !isWideVariant && (
				<Media className={styles.foregroundImage} media={foregroundImage} aspectRatio={AspectRatio['1:1']} />
			)}
			{backgroundImage && (
				<Media
					className={styles.backgroundImage}
					media={backgroundImage}
					aspectRatio={isWideVariant ? AspectRatio['1:1'] : AspectRatio['16:9']}
					imageProps={{ layout: isBpMOrLarger ? 'fill' : 'responsive' }}
				/>
			)}
		</BackgroundColor>
	);
};

BreakerBlock.groq = blockGroq({
	query: groq`{
	...,
	backgroundImage ${MediaBlock.groq.query},
  foregroundImage ${MediaBlock.groq.query},
	content[] ${simpleText},
	cta ${link}
}`,
	params: {
		...MediaBlock.groq.params,
	},
});
