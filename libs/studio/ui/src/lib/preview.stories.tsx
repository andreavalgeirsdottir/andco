import { Story } from '@storybook/react';

import { ReactQueryDecorator } from '@noa/utils-storybook';

import { Preview } from './preview';

export default {
	component: Preview,
	title: 'Sanity/Components/Exit preview',
	decorators: [ReactQueryDecorator],
};

const Template: Story = (args) => <Preview {...args} />;

export const Primary = Template.bind({});

Primary.args = {};
