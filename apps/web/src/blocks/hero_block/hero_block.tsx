import classNames from 'classnames';
import { groq } from 'next-sanity';
import React from 'react';
import { Overwrite } from 'type-zoo/types';

import { getTestAttr } from '@noa/service-testing';
import { getVariantsClassNames } from '@noa/theme';
import { Button } from '@noa/ui';

import { MediaBlock } from '@apps/web/src/blocks/media-block/media-block';
import { AspectRatio } from '@apps/web/src/components/media/aspectRatios';
import { Media, MediaProps } from '@apps/web/src/components/media/media';
import { SimpleText } from '@apps/web/src/components/simpletext/simpletext';
import { Inner } from '@apps/web/src/components/utils/inner';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { hrefFromLink } from '@apps/web/src/services/sanity/mappings';
import { Link, link, simpleText } from '@apps/web/src/services/sanity/queries/objects';
import { getBlockId } from '@apps/web/src/utils/block';

import styles from './hero_block.module.scss';

const getVariant = getVariantsClassNames(styles);

export type HeroBlockProps = {
	block: Sanity.Keyed<
		Overwrite<
			Sanity.Schema.HeroBlock,
			{
				backgroundImage?: MediaProps['media'];
				foregroundImage?: MediaProps['media'];
				cta?: Link;
			}
		>
	>;
};

export const HeroBlock = ({ block }: HeroBlockProps) => {
	const { foregroundImage, title, backgroundImage, content, cta } = block;

	return (
		<section
			className={classNames(
				styles.heroBlock,
				getVariant('title-color', block?.blockOptions?.titleColor || 'white'),
				{
					[styles.hasForegroundImage]: Media.hasMedia(foregroundImage),
					[styles.hasBottomContent]: content,
				},
			)}
			id={getBlockId(block)}
			{...getTestAttr('block_heroBlock')}
		>
			<div className={styles.top}>
				<Media
					media={backgroundImage}
					className={styles.backgroundImage}
					aspectRatio={AspectRatio['16:9']}
					imageProps={{
						width: 1366,
						height: 768,
					}}
				/>

				<Inner className={styles.content}>
					{Media.hasMedia(foregroundImage) && (
						<Media
							aspectRatio={AspectRatio['1:1']}
							media={foregroundImage}
							className={styles.foregroundImage}
							imageProps={{ width: 500, height: 500 }}
						/>
					)}
					<div className={styles.titleContainer}>
						<h2 className={styles.title}>{title}</h2>
						{!content && cta?.url && (
							<Button
								href={hrefFromLink(cta)}
								variant="fill-secondary"
								className={styles.cta}
								icon={Button.icons['arrow-right']}
							>
								{cta.title}
							</Button>
						)}
					</div>
				</Inner>
			</div>

			{content && (
				<Inner className={styles.bottom}>
					<div className={styles.content}>
						<SimpleText textBlocks={content} className={styles.simpleText} />
						{cta?.url && (
							<Button
								href={hrefFromLink(cta)}
								variant="stroke-secondary"
								className={styles.cta}
								icon={Button.icons['arrow-right']}
							>
								{cta.title}
							</Button>
						)}
					</div>
				</Inner>
			)}
		</section>
	);
};

HeroBlock.groq = blockGroq({
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
