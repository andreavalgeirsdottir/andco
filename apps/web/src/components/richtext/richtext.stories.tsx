import { Meta, Story } from '@storybook/react';

import { PaddedDecorator } from '@noa/utils-storybook';

import { richtextFixture } from '../../services/sanity/__fixtures__/richtext.fixture';
import { Richtext as RichtextComponent, RichtextProps } from './richtext';

export default {
	component: RichtextComponent,
	title: 'Sanity/Components/Richtext',
	decorators: [PaddedDecorator],
} as Meta;

const Template: Story<RichtextProps> = (args) => <RichtextComponent {...args} />;

export const Richtext = Template.bind({});

Richtext.args = {
	textBlocks: richtextFixture,
};
