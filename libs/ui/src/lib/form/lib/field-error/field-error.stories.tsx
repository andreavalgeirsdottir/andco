import { Meta, Story } from '@storybook/react';

import { PaddedDecorator } from '@noa/utils-storybook';

import { FieldError, FieldErrorProps } from './field-error';

export default {
	component: FieldError,
	title: 'Library/Form/FieldError',
	decorators: [PaddedDecorator],
} as Meta;

const Template: Story<FieldErrorProps> = (args) => {
	return <FieldError {...args} />;
};

export const Default = Template.bind({});

Default.args = {
	error: { type: 'onChange', message: 'This is an error message' },
};
