import { Meta, Story } from '@storybook/react';

import { getMediaFixture } from '@web/services/sanity/__fixtures__/media.fixture';

import { MediaBlock, MediaBlockProps } from './media-block';

export default {
	component: MediaBlock,
	title: 'Sanity/Blocks/Media',
} as Meta;

const Template: Story<MediaBlockProps> = (args) => <MediaBlock {...args} />;

export const Image = Template.bind({});

Image.storyName = 'Image';
Image.args = {
	block: getMediaFixture({ type: 'image' }),
};

export const Video = Template.bind({});

Video.storyName = 'Video';
Video.args = {
	block: getMediaFixture({ type: 'video' }),
};
Video.parameters = {
	chromatic: {
		delay: 500,
	},
};
