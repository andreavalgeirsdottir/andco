import { Meta, Story } from '@storybook/react';

import { BreakerBlock, BreakerBlockProps } from './breaker_block';
import { breakerBlockFixtures } from './breaker_block.fixtures';

const fixture: BreakerBlockProps['block'] = breakerBlockFixtures;

export default {
	component: BreakerBlock,
	title: 'Sanity/Blocks/Breaker',
} as Meta;

const Template: Story<BreakerBlockProps['block']> = (args) => <BreakerBlock block={args} />;

export const BreakerBlockStory = Template.bind({});

BreakerBlockStory.storyName = 'Breaker';
BreakerBlockStory.args = fixture;
