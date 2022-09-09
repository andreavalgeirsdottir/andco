import { Meta, Story } from '@storybook/react';
import React from 'react';

import { BlockTitle } from './block-title';
import { InnerSplit, InnerSplitProps } from './inner-split';

export default {
	component: InnerSplit,
	title: 'Sanity/Components/Inner Split',
} as Meta;

const InnerSplitTemplate: Story<InnerSplitProps> = (args) => <InnerSplit {...args} />;

export const InnerSplitStory = InnerSplitTemplate.bind({});

InnerSplitStory.storyName = 'Basic';

InnerSplitStory.args = {
	left: <div>Left</div>,
	right: <div>Right</div>,
};

InnerSplitStory.argTypes = {
	backgroundColor: {
		options: ['primary', 'secondary', 'tertiary', 'level-1', 'level-2', null],
		control: {
			type: 'radio',
		},
	},
};
const InnerSplit2Template: Story<InnerSplitProps> = (args) => <InnerSplit {...args} />;

export const InnerSplit2Story = InnerSplit2Template.bind({});

InnerSplit2Story.storyName = 'Block Title variant';

InnerSplit2Story.args = {
	backgroundColor: 'primary',
	left: (
		<BlockTitle
			title="I'm a big title"
			subtitle={
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex dignissimos nisi cupiditate quod iure
					similique! Quaerat minima quibusdam non cum aspernatur nostrum consectetur laudantium, doloribus, et
					sit sapiente quod ea.
				</p>
			}
		/>
	),
	right: (
		<div>
			<p>Place your fancy JSX on the right side</p>
		</div>
	),
};

InnerSplit2Story.argTypes = InnerSplitStory.argTypes;
