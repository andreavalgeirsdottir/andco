import { Meta, Story } from '@storybook/react';
import React, { Fragment } from 'react';

import { variablesVars } from '@noa/theme';
import { entries } from '@noa/utils-common';

import { StoryGroup } from './helpers.stories';

import styles from './colors.stories.module.scss';

export default {
	title: 'Theme/Tokens',
	args: {
		asGrid: true,
	},
} as Meta;

type Props = { asGrid: boolean };

const colors = entries(variablesVars)?.filter(([key]) => key.startsWith('--c-'));

export const Colors: Story<Props> = (args) => {
	return (
		<main className={styles.main}>
			<StoryGroup title="Colors" className={styles.colors}>
				{groupedColors.map(([rootKey, rootValue]) => {
					if (Array.isArray(rootValue)) {
						return (
							<StoryGroup.subGroup key={rootKey} title={rootKey} asGrid={args.asGrid}>
								{rootValue.map((value) => (
									<article key={value} className={styles.article}>
										<StoryGroup.square background={value} />
										<StoryGroup.itemTitle title={value} />
									</article>
								))}
							</StoryGroup.subGroup>
						);
					}

					if (typeof rootValue === 'object') {
						const rootValueEntries: [string, string[]][] = Object.entries(rootValue);

						return (
							<Fragment key={rootKey}>
								<StoryGroup.subTitle title={rootKey} />
								{rootValueEntries.map(([key, value]) => {
									return (
										<StoryGroup.subGroup key={key} title={key} asGrid={args.asGrid}>
											{value.map((v) => (
												<article key={v} className={styles.article}>
													<StoryGroup.square background={v} />
													<StoryGroup.itemTitle title={v} />
												</article>
											))}
										</StoryGroup.subGroup>
									);
								})}
							</Fragment>
						);
					}

					return (
						<StoryGroup.subGroup key={rootKey} title={rootKey} asGrid={args.asGrid}>
							<article className={styles.article}>
								<StoryGroup.square background={rootValue} />
								<StoryGroup.itemTitle title={rootKey} />
							</article>
						</StoryGroup.subGroup>
					);
				})}
			</StoryGroup>
		</main>
	);
};

type GroupedColors = Record<string, string[] & Record<string, string[] & Record<string, string[]>>>;

const groupedColors = Object.entries(
	colors.reduce((acc, [key]) => {
		const types = key.split('--c-')[1].split('-');
		const [type, color] = types;

		if (types.length === 1) {
			return { ...acc, base: [...(acc?.['base'] || []), key] } as unknown as GroupedColors;
		}

		if (types.length === 2) {
			return {
				...acc,
				[type]: [...(acc?.[type] || []), key],
			} as GroupedColors;
		}

		if (types.length === 3) {
			return {
				...acc,
				[type]: {
					...(acc?.[type] || []),
					[color]: [...(acc?.[type]?.[color] || []), key],
				},
			} as GroupedColors;
		}

		return acc;
	}, {} as GroupedColors),
);
