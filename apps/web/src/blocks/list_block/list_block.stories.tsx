import { Meta, Story } from '@storybook/react';

import { ReactQueryDecorator } from '@noa/utils-storybook';

import { ListBlock, ListBlockProps } from './list_block';
import { listBlockFixture } from './list_block.fixture';

export default {
	component: ListBlock,
	title: 'Sanity/Blocks/List',
	decorators: [ReactQueryDecorator],
} as Meta;

const Template: Story<ListBlockProps['block']> = (args) => <ListBlock block={args} />;

export const ListBlockStory = Template.bind({});

ListBlockStory.storyName = 'List';
ListBlockStory.args = listBlockFixture;
