import { Meta, Story } from '@storybook/react';

import { formsBlockFixture } from '@apps/web/src/blocks/forms_block/forms_block.fixture';

import { FormsBlock, FormsBlockProps } from './forms_block';

export default {
	component: FormsBlock,
	title: 'Sanity/Blocks/FormsBlock',
} as Meta;

const Template: Story<FormsBlockProps['block']> = (args) => <FormsBlock block={args} />;

export const FormsBlockStory = Template.bind({});

FormsBlockStory.storyName = 'Forms Block';
FormsBlockStory.args = formsBlockFixture;
