import { Meta, Story } from '@storybook/react';

import { PaddedDecorator } from '@noa/utils-storybook';

import { Checkbox, CheckboxProps } from './checkbox';

export default {
	component: Checkbox,
	title: 'Library/Form/Checkbox',
	decorators: [PaddedDecorator],
} as Meta;

type CheckboxType = CheckboxProps<'example'>;

const Template: Story<CheckboxType> = (args) => {
	return <Checkbox {...args} />;
};

export const Default = Template.bind({});

Default.args = {
	label: 'First name',
	description: 'Descriptive information about the field',
	id: 'example',
	disabled: false,
	required: false,
	autoFocus: false,
};

Default.argTypes = {
	onChange: { action: 'onChange' },
};

const TemplateWithHook: Story<CheckboxType> = (args) => {
	const checkbox = Checkbox.useCheckbox?.();

	return <Checkbox {...args} {...checkbox} />;
};

export const CheckboxWithHook = TemplateWithHook.bind({});

CheckboxWithHook.args = {
	label: 'First name',
	description: 'Descriptive information about the field',
	id: 'example',
	disabled: false,
	required: false,
	autoFocus: false,
};
