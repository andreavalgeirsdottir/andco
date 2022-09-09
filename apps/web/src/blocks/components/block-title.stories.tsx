import { Meta, Story } from '@storybook/react';

import { BlockTitle, BlockTitleProps } from './block-title';

export default {
	component: BlockTitle,
	title: 'Sanity/Components/Block Title',
} as Meta;

const BlockTitleTemplate: Story<BlockTitleProps> = (args) => <BlockTitle {...args} />;

export const BlockTitleStory = BlockTitleTemplate.bind({});

BlockTitleStory.storyName = 'Basic';
BlockTitleStory.args = {
	title: "I'm a big title",
	subtitle:
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex dignissimos nisi cupiditate quod iure similique! Quaerat minima quibusdam non cum aspernatur nostrum consectetur laudantium, doloribus, et sit sapiente quod ea.',
};
