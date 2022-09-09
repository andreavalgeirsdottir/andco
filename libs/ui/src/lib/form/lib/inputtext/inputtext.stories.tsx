import { Meta, Story } from '@storybook/react';
import React from 'react';

import { PaddedDecorator } from '@noa/utils-storybook';

import { InputText, InputTextProps } from './inputtext';

export default {
	component: InputText,
	title: 'Library/Form/InputText',
	decorators: [PaddedDecorator],
} as Meta;

const Template: Story<InputTextProps<'example'>> = (args) => {
	return <InputText {...args} />;
};

export const Default = Template.bind({});

Default.args = {
	label: 'First name',
	labelPosition: 'over',
	placeholder: 'Enter your first name',
	description: 'Descriptive information about the field',
	disabled: false,
	required: false,
	autoFocus: false,
};

Default.argTypes = {
	onChange: { action: 'onChange' },
	labelPosition: {
		options: ['after', 'before', 'over', 'under'] as InputTextProps<'example'>['labelPosition'][], // iterator
		control: {
			type: 'radio',
		},
	},
};
