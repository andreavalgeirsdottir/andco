import { Meta, Story } from '@storybook/react';
import React from 'react';
import { OmitStrict } from 'type-zoo/types';

import { GridDecorator, PaddedDecorator } from '@noa/utils-storybook';

import { iconsKey } from '../icons';
import { Icon, IconProps } from './icon';

export default {
	component: Icon,
	title: 'Library/Icon',
	decorators: [PaddedDecorator],
} as Meta;

const GridTemplate: Story<OmitStrict<IconProps, 'icon'>> = (args) => (
	<>
		{iconsKey.map((icon) => (
			<div key={icon}>
				<Icon {...args} icon={icon} />
			</div>
		))}
	</>
);

export const GridStory = GridTemplate.bind({});

GridStory.storyName = 'All icons';

GridStory.args = {
	scale: 1,
	rotate: 0,
	size: 26,
	x: 0,
	y: 0,
};

GridStory.decorators = [GridDecorator({ size: 60 })];

GridStory.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/DaRscv5obXxnoFiApmvybc/Boilerplate?node-id=2302%3A7857',
	},
};

const IconTemplate: Story<IconProps> = (args) => {
	return <Icon {...args} />;
};

export const IconStory = IconTemplate.bind({});

IconStory.storyName = 'Single icon';

IconStory.args = {
	icon: 'close',
	...GridStory.args,
};

IconStory.argTypes = {
	icon: {
		options: iconsKey,
		control: {
			type: 'radio',
		},
	},
};
