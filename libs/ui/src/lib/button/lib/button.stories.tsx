import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import { PaddedDecorator } from '@noa/utils-storybook';

import { Button, ButtonProps } from './button';

export default {
	component: Button,
	title: 'Library/Button',
	decorators: [PaddedDecorator, withDesign],
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const ButtonStory = Template.bind({});

ButtonStory.storyName = 'Button only';

ButtonStory.args = {
	children: 'Text',
	variant: 'stroke-primary',
	size: 'medium',
	disabled: false,
};

ButtonStory.argTypes = {
	onClick: { action: 'onClick' },
	variant: {
		options: [
			'plain',
			'inline',
			'fill-secondary',
			'fill-primary',
			'stroke-secondary',
			'stroke-primary',
		] as ButtonProps['variant'][],
		control: {
			type: 'radio',
		},
	},
	size: {
		options: ['xsmall', 'small', 'medium', 'large'] as ButtonProps['size'][],
		control: {
			type: 'radio',
		},
	},
};

ButtonStory.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/DaRscv5obXxnoFiApmvybc/Boilerplate?node-id=2302%3A7496',
	},
};

export const ButtonWithIconStory = Template.bind({});

ButtonWithIconStory.storyName = 'Button with Icon';

ButtonWithIconStory.args = {
	children: 'Text',
	variant: 'stroke-primary',
	size: 'medium',
	icon: { icon: 'close', position: 'before' },
	disabled: false,
};

ButtonWithIconStory.argTypes = { ...ButtonStory.argTypes };
ButtonWithIconStory.parameters = { ...ButtonStory.parameters };

export const LinkWithIconStory = Template.bind({});

LinkWithIconStory.storyName = 'Button as Link with Icon';

LinkWithIconStory.args = {
	children: 'Text',
	href: '/',
	variant: 'stroke-primary',
	size: 'medium',
	icon: { icon: 'close', position: 'before' },
	disabled: false,
};

LinkWithIconStory.argTypes = { ...ButtonStory.argTypes };
LinkWithIconStory.parameters = { ...ButtonStory.parameters };

export const ButtonIconStory = Template.bind({});

ButtonIconStory.storyName = 'Icon only';

ButtonIconStory.args = {
	variant: 'stroke-primary',
	size: 'medium',
	icon: { icon: 'close', position: 'before' },
	'aria-label': 'Close',
	disabled: false,
};

ButtonIconStory.argTypes = { ...ButtonStory.argTypes };
ButtonIconStory.parameters = { ...ButtonStory.parameters };
