import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import classNames from 'classnames';
import React from 'react';
import { Overwrite } from 'type-zoo/types';

import { Button } from '@noa/ui';

import { simpleTextComponents } from '@apps/web/src/components/simpletext/simpletext';
import { hrefFromLink } from '@apps/web/src/services/sanity/mappings';
import { SanityImage as SanityImageType } from '@apps/web/src/services/sanity/queries/types';
import { Link } from '@web/services/sanity/queries/objects';

import { SanityImage } from '../sanity-image/sanity-image';

import styles from './richtext.module.scss';

const richTextComponents: Partial<PortableTextReactComponents> = {
	block: simpleTextComponents.block,
	marks: simpleTextComponents.marks,
	types: {
		button: ({
			value: { link, blockOptions },
		}: {
			value: Overwrite<Sanity.Schema.ButtonObject, { link: Link }>;
		}) => {
			return (
				<div
					className={classNames(
						styles.buttonContainer,
						styles[`alignment-${blockOptions?.alignment || 'left'}`],
					)}
				>
					<Button
						variant={blockOptions?.variant === 'fill' ? 'fill-secondary' : 'stroke-secondary'}
						size={blockOptions?.size}
						href={hrefFromLink(link)}
					>
						{link.title}
					</Button>
				</div>
			);
		},
		image: ({
			value,
		}: {
			value: SanityImageType & { blockOptions?: { widerThanText?: boolean; alignment?: string } };
		}) => (
			<div
				className={classNames(styles.imageContainer, {
					[styles.widerThanText]: value?.blockOptions?.widerThanText,
					[styles[`alignment-${value?.blockOptions?.alignment || 'left'}`]]: value?.blockOptions?.alignment,
				})}
			>
				<SanityImage
					image={value}
					layout={value?.blockOptions?.widerThanText ? 'responsive' : 'fixed'}
					className={styles.image}
					width={900}
					height={900}
				/>
			</div>
		),
	},
};

export interface RichtextProps {
	textBlocks: Sanity.Block[];
	className?: string;
}

export function Richtext({ textBlocks, className }: RichtextProps) {
	return (
		<div className={classNames(styles.block, className)}>
			<PortableText value={textBlocks} components={richTextComponents} />
		</div>
	);
}
