import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';

import { PaddedDecorator } from '@noa/utils-storybook';

import { Button } from '../../button';
import { PortalProvider } from '../../portal';
import { Dialog, DialogProps } from './dialog';

export default {
	component: Dialog,
	title: 'Library/Dialog',
	decorators: [
		PaddedDecorator,
		withDesign,
		(S) => (
			<PortalProvider>
				<S />
			</PortalProvider>
		),
	],
	args: {
		children: "I'm the content inside of the Dialog",
	},
} as Meta;

const DialogTemplate: Story<DialogProps> = (args) => {
	const dialog = Dialog.useDialog();

	return (
		<>
			<Dialog {...dialog} {...args} />
			<Button onClick={dialog.handleToggle}>Open the dialog</Button>
		</>
	);
};

export const DialogStory = DialogTemplate.bind({});

DialogStory.storyName = 'Dialog';

const DialogWithActions: Story<DialogProps> = ({ children, ...args }) => {
	const dialog = Dialog.useDialog();

	return (
		<>
			<Dialog {...dialog} {...args}>
				{children}
				<Dialog.Actions
					buttons={[
						{ id: 'Yes', title: 'Yes', onClick: action('Yes'), priority: 'high' },
						{ id: 'No', title: 'No', onClick: action('No') },
					]}
				/>
			</Dialog>
			<Button onClick={dialog.handleToggle}>Open the dialog</Button>
		</>
	);
};

export const DialogWithActionsStory = DialogWithActions.bind({});

DialogWithActionsStory.storyName = 'Dialog with Actions';
