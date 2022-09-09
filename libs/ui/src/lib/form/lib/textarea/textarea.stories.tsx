import { Meta, Story } from '@storybook/react';
import React from 'react';

import { PaddedDecorator } from '@noa/utils-storybook';

import { TextArea, TextAreaProps } from './textarea';

export default {
	component: TextArea,
	title: 'Library/Form/TextArea',
	decorators: [PaddedDecorator],
} as Meta;

const Template: Story<TextAreaProps<'example'>> = (args) => {
	return <TextArea {...args} />;
};

export const Default = Template.bind({});

Default.args = {
	label: 'Comment',
	labelPosition: 'over',
	placeholder: 'Add a note',
	description: 'Descriptive information about the field',
	autoFocus: false,
	disabled: false,
	required: false,
};

Default.argTypes = {
	onChange: { action: 'onChange' },
	labelPosition: {
		options: ['after', 'before', 'over', 'under'] as TextAreaProps<'example'>['labelPosition'][], // iterator
		control: {
			type: 'radio',
		},
	},
};
