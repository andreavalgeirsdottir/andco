import { Meta, Story } from '@storybook/react';
import React from 'react';

import { vimeoFixture } from '@web/services/sanity/__fixtures__/vimeo.fixture';

import { VimeoVideo, VimeoVideoProps } from './vimeo-video';

export default {
	component: VimeoVideo,
	title: 'Sanity/Components/Vimeo',
} as Meta<VimeoVideoProps>;

const Template: Story<VimeoVideoProps> = (args) => <VimeoVideo {...args} />;

export const Primary = Template.bind({});

Primary.storyName = 'Vimeo';
Primary.args = {
	video: vimeoFixture,
};
Primary.parameters = {
	chromatic: {
		delay: 5000,
	},
};
