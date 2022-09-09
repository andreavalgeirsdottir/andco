import { useListDisclosure } from '@noaignite-dk/utils-next';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { groq } from 'next-sanity';
import React, { ReactNode } from 'react';
import { Overwrite } from 'type-zoo/types';

import { getTestAttr } from '@noa/service-testing';
import { Icon } from '@noa/ui';
import { MOTIONS, TRANSITION } from '@noa/utils-animations';
import { isReactNode, pruneArray } from '@noa/utils-common';

import { BackgroundColor } from '@apps/web/src/blocks/components/background-color';
import { BlockTitle } from '@apps/web/src/blocks/components/block-title';
import { InnerSplit } from '@apps/web/src/blocks/components/inner-split';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { richText, simpleText } from '@apps/web/src/services/sanity/queries/objects';
import { getBlockId } from '@apps/web/src/utils/block';
import { Richtext } from '@web/components/richtext/richtext';

import styles from './accordion_block.module.scss';

export type AccordionBlockProps = {
	block: Sanity.Keyed<
		Overwrite<
			Sanity.Schema.AccordionBlock,
			{
				items?: Overwrite<
					Sanity.Schema.AccordionBlock['items'][number],
					{ content: Sanity.Schema.RichText | ReactNode }
				>[];
			}
		>
	>;
	className?: string;
};

export const AccordionBlock = ({ block, className, ...rest }: AccordionBlockProps) => {
	const listDisclosure = useListDisclosure({
		...(block?.blockOptions?.multiple
			? {
					multiple: true,
					initialOpen: block?.items?.filter((item) => item.defaultOpen).map((item) => item._key),
			  }
			: {
					multiple: false,
					initialOpen: pruneArray([block?.items?.find((item) => item.defaultOpen)?._key]),
			  }),
	});

	const fade = MOTIONS.fade.fade;

	return (
		<BackgroundColor
			backgroundColor={block?.blockOptions?.backgroundColor}
			id={getBlockId(block)}
			tag="section"
			{...getTestAttr('block_accordionBlock')}
			{...rest}
		>
			<InnerSplit
				className={classNames(styles.accordionBlock, className)}
				left={<BlockTitle title={block.title} subtitle={block.subtitle} />}
				right={
					block?.items && (
						<div>
							{block.items.map((item) => {
								const regionId = `accordion-${item._key}`;
								const buttonId = `button-${item._key}`;
								const isOpen = listDisclosure.isOpen(regionId);
								const handleToggle = listDisclosure.handleToggle(regionId);

								return (
									<div key={regionId} className={classNames(styles.item, { [styles.isOpen]: isOpen })}>
										<button
											type="button"
											className={styles.button}
											onClick={handleToggle}
											id={buttonId}
											aria-controls={regionId}
											aria-expanded={isOpen}
										>
											<span>{item.title}</span>
											<span className={styles.icon}>
												{isOpen ? <Icon icon="minus" size={10} /> : <Icon icon="plus" size={10} />}
											</span>
										</button>
										<AnimatePresence>
											{isOpen && (
												<motion.section
													initial={{ ...fade.initial, height: 0 }}
													animate={{ ...fade.animate, height: 'auto', transition: TRANSITION.quick }}
													exit={{ ...fade.exit, height: 0, transition: TRANSITION.instant }}
													className={styles.content}
													aria-labelledby={buttonId}
													id={regionId}
													role="region"
												>
													{isReactNode(item.content) ? (
														item.content
													) : (
														<Richtext textBlocks={item.content as Sanity.Block[]} />
													)}
												</motion.section>
											)}
										</AnimatePresence>
									</div>
								);
							})}
						</div>
				)
				}
			/>
		</BackgroundColor>
	);
};

AccordionBlock.groq = blockGroq({
	query: groq`{
	...,
	subtitle[] ${simpleText},
	items[] {
		...,
		content[] ${richText}
	}
}`,
});
