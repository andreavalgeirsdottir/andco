import { Meta, Story } from '@storybook/react';

import { PaddedDecorator } from '@noa/utils-storybook';

import { Select, SelectProps } from './select';

export default {
	component: Select,
	title: 'Library/Form/Select',
	decorators: [PaddedDecorator],
} as Meta;

const options = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' },
	{ value: 'three', label: 'Three' },
];

type Option = typeof options[number];

type SelectType = SelectProps<'example', Option>;

const Template: Story<SelectType> = (args) => {
	return <Select {...args} />;
};

export const Default = Template.bind({});

Default.args = {
	label: 'First name',
	labelPosition: 'over',
	description: 'Descriptive information about the field',
	id: 'example',
	options,
	disabled: false,
	required: false,
	autoFocus: false,
};

Default.argTypes = {
	onChange: { action: 'onChange' },
	labelPosition: {
		options: ['after', 'before', 'over', 'under'] as SelectType['labelPosition'][], // iterator
		control: {
			type: 'radio',
		},
	},
};
