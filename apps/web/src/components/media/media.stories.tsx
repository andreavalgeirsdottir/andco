import { Meta, Story } from '@storybook/react';

import { AspectRatio } from '@web/components/media/aspectRatios';
import { getMediaFixture } from '@web/services/sanity/__fixtures__/media.fixture';
import { getAspectRatioControl } from '@web/utils/storybook';

import { Media, MediaProps } from './media';

export default {
	component: Media,
	title: 'Sanity/Components/Media',
	argTypes: {
		aspectRatio: getAspectRatioControl(),
	},
} as Meta<MediaProps>;

const Template: Story<MediaProps> = (args) => <Media {...args} />;

export const Image = Template.bind({});

Image.args = {
	media: getMediaFixture({ type: 'image' }),
	aspectRatio: AspectRatio['16:9'],
};

export const Video = Template.bind({});

Video.args = {
	media: getMediaFixture({ type: 'video' }),
	aspectRatio: AspectRatio['16:9'],
};
Video.parameters = {
	chromatic: {
		delay: 500,
	},
};
