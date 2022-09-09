import { Meta, Story } from '@storybook/react';

import { CustomBlock, CustomBlockProps } from './custom_block';
import { customBlockFixture } from './custom_block.fixture';

export default {
	component: CustomBlock,
	title: 'Sanity/Blocks/Custom',
} as Meta;

const Template: Story<CustomBlockProps['block']> = (args) => <CustomBlock block={args} />;

export const CustomBlockStory = Template.bind({});

CustomBlockStory.storyName = 'Custom';
CustomBlockStory.args = customBlockFixture;
