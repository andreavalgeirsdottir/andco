import { Meta, Story } from '@storybook/react';

import { PaddedDecorator } from '@noa/utils-storybook';

import { simpletextFixture } from '@web/services/sanity/__fixtures__/simpletext.fixture';

import { SimpleText as SimpleTextComponent, SimpleTextProps } from './simpletext';

export default {
	component: SimpleTextComponent,
	title: 'Sanity/Components/SimpleText',
	decorators: [PaddedDecorator],
} as Meta;

const Template: Story<SimpleTextProps> = (args) => <SimpleTextComponent {...args} />;

export const SimpleText = Template.bind({});

SimpleText.args = {
	textBlocks: simpletextFixture,
};
