import { Meta, Story } from '@storybook/react';
import { ReactNode } from 'react';

import { PaddedDecorator } from '@noa/utils-storybook';

import { Label, LabelProps } from './label';

export default {
	component: Label,
	title: 'Library/Form/Label',
	decorators: [PaddedDecorator],
} as Meta;

const Template: Story<LabelProps> = ({ children, ...args }) => {
	return <Label {...args}>{children as ReactNode}</Label>;
};

export const Default = Template.bind({});

Default.args = {
	label: "I'm a label",
	labelPosition: 'over',
	children: "I'm whatever children you pass",
};

Default.argTypes = {
	labelPosition: {
		options: ['after', 'before', 'over', 'under'] as LabelProps['labelPosition'][], // iterator
		control: {
			type: 'radio',
		},
	},
};
