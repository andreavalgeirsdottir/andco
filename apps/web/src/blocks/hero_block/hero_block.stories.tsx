import { Meta, Story } from '@storybook/react';

import { HeroBlock, HeroBlockProps } from './hero_block';
import { HeroBlockFixtures } from './hero_block.fixture';

const fixture: HeroBlockProps['block'] = HeroBlockFixtures();

export default {
	component: HeroBlock,
	title: 'Sanity/Blocks/Hero',
} as Meta;

const Template: Story<HeroBlockProps['block']> = (args) => <HeroBlock block={args} />;

export const HeroBlockStory = Template.bind({});

HeroBlockStory.storyName = 'Hero';
HeroBlockStory.args = fixture;
