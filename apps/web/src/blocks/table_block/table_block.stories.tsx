import { Meta, Story } from '@storybook/react';

import { TableBlock, TableBlockProps } from './table_block';
import { tableBlockFixture } from './table_block.fixture';

export default {
	component: TableBlock,
	title: 'Sanity/Blocks/Table',
} as Meta;

const Template: Story<TableBlockProps['block']> = (args) => <TableBlock block={args} />;

export const TableBlockStory = Template.bind({});

TableBlockStory.storyName = 'Table';
TableBlockStory.args = tableBlockFixture;
