import { Meta, Story } from '@storybook/react';
import React from 'react';

import { variablesVars } from '@noa/theme';
import { entries } from '@noa/utils-common';

import { StoryGroup } from './helpers.stories';

import styles from './typography.stories.module.scss';

export default {
	title: 'Theme/Tokens/Typography',
	args: {
		exampleText: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
		exampleTextLong:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa rerum voluptates id voluptate corrupti aperiam vero cupiditate commodi. Officia est odit incidunt ex sint porro inventore ullam dignissimos mollitia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque culpa rerum voluptates id voluptate corrupti aperiam vero cupiditate commodi. Officia est odit incidunt ex sint porro inventore ullam dignissimos mollitia!',
	},
} as Meta;

type Props = { exampleText: string; exampleTextLong: string };

const fontVariables = entries(variablesVars)?.reduce((acc, [key]) => {
	if (['--fw-', '--fz-', '--ff-', '--fw-', '--lh-', '--ls-'].some((prefix) => key.startsWith(prefix))) {
		const rawValue = key.replace(/^--(fw|fz|ff|fw|lh|ls)-/, '');
		const keyWithoutValue = key.replace(rawValue, '');

		return {
			...acc,
			[keyWithoutValue]: [...(acc?.[keyWithoutValue] || []), key],
		};
	}

	return acc;
}, {} as Record<string, string[]>);

export const FontSizes: Story<Props> = (args) => {
	return (
		<main className={styles.main}>
			<StoryGroup.subGroup title="Font size">
				{fontVariables?.['--fz-']?.map((value) => (
					<article key={value} className={styles.article}>
						<StoryGroup.itemTitle title={value} className={styles.subGroupTitle} />
						<StoryGroup.itemValue title={args?.exampleText} style={{ fontSize: `var(${value})` }} />
					</article>
				))}
			</StoryGroup.subGroup>
		</main>
	);
};

export const FontWeight: Story<Props> = (args) => {
	return (
		<main className={styles.main}>
			<StoryGroup.subGroup title="Font weight">
				{fontVariables?.['--fw-']?.map((value) => (
					<article key={value} className={styles.article}>
						<StoryGroup.itemTitle title={value} className={styles.subGroupTitle} />
						<StoryGroup.itemValue title={args?.exampleText} style={{ fontWeight: `var(${value})` }} />
					</article>
				))}
			</StoryGroup.subGroup>
		</main>
	);
};

export const FontFamily: Story<Props> = (args) => {
	return (
		<main className={styles.main}>
			<StoryGroup.subGroup title="Font family">
				{fontVariables?.['--ff-']?.map((value) => (
					<article key={value} className={styles.article}>
						<StoryGroup.itemTitle title={value} className={styles.subGroupTitle} />
						<StoryGroup.itemValue title={args?.exampleText} style={{ fontFamily: `var(${value})` }} />
					</article>
				))}
			</StoryGroup.subGroup>
		</main>
	);
};

export const LineHeight: Story<Props> = (args) => {
	return (
		<main className={styles.main}>
			<StoryGroup.subGroup title="Line height">
				{fontVariables?.['--lh-']?.map((value) => (
					<article key={value} className={styles.article}>
						<StoryGroup.itemTitle title={value} className={styles.subGroupTitle} />
						<StoryGroup.itemValue title={args?.exampleTextLong} style={{ lineHeight: `var(${value})` }} />
					</article>
				))}
			</StoryGroup.subGroup>
		</main>
	);
};

export const LetterSpacing: Story<Props> = (args) => {
	return (
		<main className={styles.main}>
			<StoryGroup.subGroup title="Letter Spacing">
				{fontVariables?.['--ls-']?.map((value) => (
					<article key={value} className={styles.article}>
						<StoryGroup.itemTitle title={value} className={styles.subGroupTitle} />
						<StoryGroup.itemValue title={args?.exampleTextLong} style={{ letterSpacing: `var(${value})` }} />
					</article>
				))}
			</StoryGroup.subGroup>
		</main>
	);
};
