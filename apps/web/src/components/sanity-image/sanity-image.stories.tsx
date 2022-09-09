import { Meta, Story } from '@storybook/react';

import { AspectRatio } from '@web/components/media/aspectRatios';
import { getImageFixture } from '@web/services/sanity/__fixtures__/image.fixture';
import { getAspectRatioControl } from '@web/utils/storybook';

import { SanityImage, SanityImageProps } from './sanity-image';

export default {
	component: SanityImage,
	title: 'Sanity/Components/Image',
	argTypes: {
		aspectRatio: getAspectRatioControl(),
	},
} as Meta;

const Template: Story<SanityImageProps> = (args) => <SanityImage {...args} />;

export const Primary = Template.bind({});

Primary.storyName = 'Image (16:9)';
Primary.args = {
	image: getImageFixture(),
	aspectRatio: AspectRatio['16:9'],
};

export const Secondary = Template.bind({});

Secondary.storyName = 'Image (4:3)';
Secondary.args = {
	image: getImageFixture(),
	aspectRatio: AspectRatio['4:3'],
};
