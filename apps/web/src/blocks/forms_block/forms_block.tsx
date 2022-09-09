import classNames from 'classnames';
import { groq } from 'next-sanity';
import React from 'react';

import { getTestAttr } from '@noa/service-testing';
import { RecordRender } from '@noa/utils-next';

import { BlockTitle } from '@apps/web/src/blocks/components/block-title';
import { InnerSplit } from '@apps/web/src/blocks/components/inner-split';
import { ContactForm } from '@apps/web/src/components/forms/contact/contact';
import { DemoForm } from '@apps/web/src/components/forms/demo/demo';
import { NewsletterForm } from '@apps/web/src/components/forms/newsletter/newsletter';
import { blockGroq } from '@apps/web/src/services/sanity/groq';
import { simpleText } from '@apps/web/src/services/sanity/queries/objects';
import { getBlockId } from '@apps/web/src/utils/block';

import styles from './forms_block.module.scss';

export type FormsBlockProps = {
	block: Sanity.Keyed<Sanity.Schema.FormsBlock>;
};

export const FormsBlock = ({ block }: FormsBlockProps) => {
	const {
		options: { type, description, submitText },
		blockOptions: { backgroundColor, reversed },
	} = block || {};

	return (
		<InnerSplit
			className={classNames(styles.formsBlock)}
			backgroundColor={backgroundColor?.color}
			id={getBlockId(block)}
			{...getTestAttr('block_formsBlock')}
			reversed={reversed}
			left={<BlockTitle title={block.title} subtitle={block.content} className={styles.title} />}
			right={
				<RecordRender
					id={type}
					render={{
						contact: (
							<ContactForm
								submitText={submitText}
								description={description}
								backgroundColor={backgroundColor}
							/>
						),
						demo: (
							<DemoForm submitText={submitText} description={description} backgroundColor={backgroundColor} />
						),
						newsletter: (
							<NewsletterForm
								submitText={submitText}
								description={description}
								backgroundColor={backgroundColor}
							/>
						),
					}}
				/>
			}
		/>
	);
};

FormsBlock.groq = blockGroq({
	query: groq`{
	...,
	options {
		...,
		description[] ${simpleText},
	},
	content[] ${simpleText},
}`,
});
