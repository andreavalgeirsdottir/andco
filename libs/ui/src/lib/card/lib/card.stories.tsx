import { Meta, Story } from '@storybook/react';
import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import { PaddedDecorator } from '@noa/utils-storybook';

import { Card, CardProps } from './card';

export default {
	component: Card,
	title: 'Library/Card',
	decorators: [PaddedDecorator, withDesign],
} as Meta;

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const CardAsButtonStory = Template.bind({});

CardAsButtonStory.storyName = 'Interactive';

CardAsButtonStory.args = {
	title: 'Card title',
	content:
		'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, molestiae. Velit odio tempora voluptatibus doloremque officia. Mollitia asperiores voluptatem, rem repudiandae a amet voluptas rerum fugit, animi libero consequatur perspiciatis?',
	size: 'small',
	href: '?path=/story/library-card--card-story',
	disabled: false,
};

CardAsButtonStory.argTypes = {
	onClick: { action: 'onClick' },
};

CardAsButtonStory.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/DaRscv5obXxnoFiApmvybc/Boilerplate?node-id=2319%3A7383',
	},
};

export const CardStory = Template.bind({});

CardStory.storyName = 'Non-interactive';

CardStory.args = {
	title: 'Card title',
	content:
		'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id, molestiae. Velit odio tempora voluptatibus doloremque officia. Mollitia asperiores voluptatem, rem repudiandae a amet voluptas rerum fugit, animi libero consequatur perspiciatis?',
	size: 'small',
	disabled: false,
};

CardStory.parameters = CardAsButtonStory.parameters;
