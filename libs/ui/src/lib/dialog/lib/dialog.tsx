import classnames from 'classnames';
import React from 'react';

import { getVariantsClassNames } from '@noa/theme';
import { MOTIONS } from '@noa/utils-animations';

import { Button, ButtonProps } from '../../button';
import { Portal, PortalProps } from '../../portal';

import styles from './dialog.module.scss';

const getVariant = getVariantsClassNames(styles);

export type DialogProps = {
	children: React.ReactNode;
	classNames?: Partial<Record<'close', string>>;
	size?: 'small' | 'large';
} & PortalProps;

export const Dialog = ({
	children,
	handleClose,
	className,
	classNames,
	size = 'large',
	...rest
}: DialogProps) => {
	return (
		<Portal
			className={classnames(styles.dialog, getVariant('size', size), className)}
			handleClose={handleClose}
			renderBefore={<Portal.Overlay handleClose={handleClose} />}
			animation={MOTIONS['in-up']['out-down']}
			{...rest}
		>
			<Button
				icon={{ icon: 'close' }}
				className={classnames(styles.close, classNames?.close)}
				variant="plain"
				aria-label="Close the dialog"
				onClick={handleClose}
			/>
			{children}
		</Portal>
	);
};

export const useDialog = () => Portal.usePortal({ closeOnClickOutside: false });

Dialog.useDialog = useDialog;

const Actions = ({
	buttons,
}: {
	buttons: (ButtonProps & { priority?: 'medium' | 'high'; id: string | number })[];
}) => {
	if (buttons?.length === 0) return null;

	return (
		<div className={styles.actions}>
			{buttons.map(({ id, priority, children, title, ...button }) => (
				<Button
					key={id}
					variant={priority === 'high' ? 'fill-primary' : 'stroke-primary'}
					size="medium"
					title={title}
					{...button}
				>
					{children || title}
				</Button>
			))}
		</div>
	);
};

Dialog.Actions = Actions;
