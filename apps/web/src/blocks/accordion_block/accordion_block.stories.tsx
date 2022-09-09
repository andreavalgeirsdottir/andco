import { Meta, Story } from '@storybook/react';

import { AccordionBlock, AccordionBlockProps } from './accordion_block';
import { accordionBlockFixture } from './accordion_block.fixtures';

export default {
	component: AccordionBlock,
	title: 'Sanity/Blocks/Accordion',
} as Meta;

const Template: Story<AccordionBlockProps['block']> = (args) => <AccordionBlock block={args} />;

export const AccordionBlockStory = Template.bind({});

AccordionBlockStory.storyName = 'Accordion';
AccordionBlockStory.args = accordionBlockFixture;
