import { Meta, Story } from '@storybook/react';
import React from 'react';

import { muxFixture } from '@web/services/sanity/__fixtures__/mux.fixture';

import { MuxVideo, MuxVideoProps } from './mux-video';

export default {
	component: MuxVideo,
	title: 'Sanity/Components/Video',
} as Meta<MuxVideoProps>;

const Template: Story<MuxVideoProps> = (args) => <MuxVideo {...args} />;

export const Primary = Template.bind({});

Primary.storyName = 'Video';
Primary.args = {
	video: muxFixture,
};
Primary.parameters = {
	chromatic: {
		delay: 5000,
	},
};
