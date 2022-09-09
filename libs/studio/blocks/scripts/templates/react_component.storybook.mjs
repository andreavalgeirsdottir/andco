export const template = `import { Meta, Story } from '@storybook/react';

import { <%= blockNameTypePascal; %>, <%= blockNameTypePascal; %>Props } from './<%= blockNameTypeSnake; %>';
import { <%= blockNameTypeCamel; %>Fixture } from './<%= blockNameTypeSnake; %>.fixture';

export default {
	component: <%= blockNameTypePascal; %>,
	title: 'Sanity/Blocks/<%= blockNameFlagPascal; %>',
} as Meta;

const Template: Story<<%= blockNameTypePascal; %>Props['block']> = (args) => <<%= blockNameTypePascal; %> block={args} />;

export const <%= blockNameTypePascal; %>Story = Template.bind({});

<%= blockNameTypePascal; %>Story.storyName = '<%= blockNameFlagTitle; %>';
<%= blockNameTypePascal; %>Story.args = <%= blockNameTypeCamel; %>Fixture;
`;
