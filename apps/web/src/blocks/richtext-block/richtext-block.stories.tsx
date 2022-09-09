import { Meta, Story } from '@storybook/react';

import { richtextFixture } from '@web/services/sanity/__fixtures__/richtext.fixture';

import { RichTextBlock, RichTextBlockProps } from './richtext-block';

export default {
	component: RichTextBlock,
	title: 'Sanity/Blocks/Richtext',
} as Meta;

const Template: Story<RichTextBlockProps['block']> = (args) => <RichTextBlock block={args} />;

export const RichTextStory = Template.bind({});

RichTextStory.args = richtextFixture;
