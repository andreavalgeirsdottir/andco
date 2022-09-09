import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import { PaddedDecorator } from '@noa/utils-storybook';

import { Button } from '../../button';
import { Tooltip, TooltipProps } from './tooltip';

export default {
	component: Tooltip,
	title: 'Library/Tooltip',
	decorators: [PaddedDecorator, withDesign],
} as Meta;

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />;

export const TooltipStory = Template.bind({});

TooltipStory.storyName = 'Tooltip only';

TooltipStory.args = {
	children: <Button>I'm a button</Button>,
	label: "I'm still a button... are you blind?",
};
