import { Meta, Story } from '@storybook/react';

import { ColumnsBlock, ColumnsBlockProps } from './columns_block';
import { ColumnsBlockFixtures } from './columns_block.fixtures';

const fixture: ColumnsBlockProps['block'] = ColumnsBlockFixtures();

export default {
	component: ColumnsBlock,
	title: 'Sanity/Blocks/Columns',
} as Meta;

const Template: Story<ColumnsBlockProps['block']> = (args) => <ColumnsBlock block={args} />;

export const ColumnsBlockStory = Template.bind({});

ColumnsBlockStory.storyName = 'Columns';
ColumnsBlockStory.args = fixture;
