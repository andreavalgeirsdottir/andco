import { Meta, Story } from '@storybook/react';

import { ContentBlock, ContentBlockProps } from './content-block';
import { contentBlockFixture } from './content-block.fixture';

const fixture: ContentBlockProps['blocks'] = contentBlockFixture;

export default {
	component: ContentBlock,
	title: 'Sanity/Components/Content block',
} as Meta;

const Template: Story<ContentBlockProps['blocks']> = (args) => <ContentBlock blocks={Object.values(args)} />;

export const Primary = Template.bind({});

Primary.args = fixture;

Primary.parameters = {
	chromatic: {
		delay: 500,
	},
};
