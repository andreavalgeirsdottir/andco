import { Meta, Story } from '@storybook/react';

import { getMediaFixture } from '../../services/sanity/__fixtures__/media.fixture';
import { BlockHeader, BlockHeaderProps } from './block-header';

export default {
	component: BlockHeader,
	title: 'Sanity/Components/Block Header',
} as Meta;

const BlockHeaderTemplate: Story<BlockHeaderProps> = (args) => <BlockHeader {...args} />;

export const BlockHeaderStory = BlockHeaderTemplate.bind({});

BlockHeaderStory.storyName = 'Basic';
BlockHeaderStory.args = {
	title: "I'm a big fancy title",
	preTitle: 'Lorem ipsum dolor sit amet',
	isFetching: false,
};

const BlockHeader2Template: Story<BlockHeaderProps> = (args) => <BlockHeader {...args} />;

export const BlockHeader2Story = BlockHeader2Template.bind({});

BlockHeader2Story.storyName = 'Block Title variant';
BlockHeader2Story.args = {
	...BlockHeaderStory.args,
	media: getMediaFixture(),
	cta: {
		href: '/',
		children: 'Call to action',
	},
};
