import { Meta, Story } from '@storybook/react';

import { simpletextFixture } from '@web/services/sanity/__fixtures__/simpletext.fixture';

import { SimpleTextBlock, SimpleTextBlockProps } from './simpletext-block';

export default {
	component: SimpleTextBlock,
	title: 'Sanity/Blocks/SimpleText',
} as Meta;

const Template: Story<SimpleTextBlockProps['block']> = (args) => <SimpleTextBlock block={args} />;

export const SimpleTextStory = Template.bind({});

SimpleTextStory.args = simpletextFixture;
