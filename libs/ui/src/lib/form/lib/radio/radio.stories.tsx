import { Meta, Story } from '@storybook/react';

import { PaddedDecorator } from '@noa/utils-storybook';

import { RadioGroup, RadioProps } from './radio';

export default {
	component: RadioGroup,
	title: 'Library/Form/Radio',
	decorators: [PaddedDecorator],
} as Meta;

const options = [
	{ value: 'one', label: 'One', description: 'Description for One' },
	{ value: 'two', label: 'Two', description: 'Description for Two' },
	{ value: 'three', label: 'Three', description: 'Description for Three' },
];

type Option = typeof options[number];

type RadioType = RadioProps<'example', Option['value'], Option>;

const Template: Story<RadioType> = (args) => {
	return <RadioGroup {...args} />;
};

export const Default = Template.bind({});

Default.args = {
	id: 'example',
	options,
	disabled: false,
	required: false,
	autoFocus: false,
};

Default.argTypes = {
	onChange: { action: 'onChange' },
};

const TemplateWithHook: Story<RadioType> = (args) => {
	const radio = RadioGroup.useRadio?.();

	return <RadioGroup {...args} {...radio} />;
};

export const RadioWithHook = TemplateWithHook.bind({});

RadioWithHook.args = {
	id: 'example',
	options,
	disabled: false,
	required: false,
	autoFocus: false,
};
