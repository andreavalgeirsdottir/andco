import { Meta, Story } from '@storybook/react';
import React from 'react';

import { externalLinkFixture, internalLinkFixture } from '@web/services/sanity/__fixtures__/link.fixture';

import { SanityLink, SanityLinkProps } from './sanity-link';

export default {
	title: 'Sanity/Components/Link',
	component: SanityLink,
} as Meta<typeof SanityLink>;

const Template: Story<SanityLinkProps> = (args) => <SanityLink {...args} />;

export const InternalLink = Template.bind({});

InternalLink.args = {
	link: internalLinkFixture,
};

export const ExternalLink = Template.bind({});

ExternalLink.args = {
	link: externalLinkFixture,
};
