import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import { PaddedDecorator } from '@noa/utils-storybook';

import { CardList, CardListProps } from './card-list';
import { cardListFixtures } from './card-list.fixtures';

export default {
	component: CardList,
	title: 'Library/Card List',
	decorators: [PaddedDecorator, withDesign],
} as Meta;

const Template: Story<CardListProps> = (args) => <CardList {...args} />;

export const CardListAsButtonStory = Template.bind({});

CardListAsButtonStory.storyName = 'Interactive';

CardListAsButtonStory.args = {
	list: cardListFixtures.map((card) => ({
		...card,
		href: '?path=/story/library-card--card-story',
	})),
};

CardListAsButtonStory.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/DaRscv5obXxnoFiApmvybc/Boilerplate?node-id=2319%3A7383',
	},
};

export const CardListStory = Template.bind({});

CardListStory.storyName = 'Non-interactive';

CardListStory.args = {
	list: cardListFixtures,
};

CardListStory.parameters = CardListAsButtonStory.parameters;
