import { useDisclosure, UseDisclosureConfig, useKeyPressEffect } from '@noaignite-dk/utils-next';
import classnames from 'classnames';
import { AnimatePresence, HTMLMotionProps, motion, MotionProps, Transition } from 'framer-motion';
import React, { ReactNode, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { MOTIONS, TRANSITION } from '@noa/utils-animations';
import { useOnClickOutside } from '@noa/utils-next';

import { PortalProvider } from './portal_provider';

import styles from './portal.module.scss';

export type PortalProps = {
	animation?: MotionProps;
	children: ReactNode;
	className?: string;
	closeOnClickOutside?: boolean;
	portalContainerId?: string;
	renderAfter?: React.ReactNode;
	renderBefore?: React.ReactNode;
	transition?: Transition;
} & UsePortalReturn;

export const Portal = ({
	animation,
	children,
	className,
	handleClose: _handleClose,
	handleOpen: _handleOpen,
	handleToggle: _handleToggle,
	portalContainerId = `#${PortalProvider.id}`,
	portalRef,
	renderAfter,
	renderBefore,
	isOpen,
	transition = TRANSITION.base,
	...rest
}: PortalProps & HTMLMotionProps<'div'>) => {
	const container = typeof window !== 'undefined' && document?.querySelector(portalContainerId);

	if (!container) {
		if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
			console.warn('Portal container not found');
		}

		return null;
	}

	return ReactDOM.createPortal(
		<AnimatePresence>
			{isOpen && (
				<>
					{renderBefore}
					<motion.div
						{...(animation || MOTIONS['in-down']['out-down'])}
						className={className}
						transition={transition}
						ref={portalRef}
						{...rest}
					>
						{children}
					</motion.div>
					{renderAfter}
				</>
			)}
		</AnimatePresence>,
		container,
	);
};

const Overlay = ({
	handleClose,
	className,
	...rest
}: Pick<UsePortalReturn, 'handleClose'> & { className?: string }) => (
	<motion.button
		initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
		exit={{ opacity: 0, backdropFilter: 'blur(0px)', transition: TRANSITION.base }}
		animate={{ opacity: 1, backdropFilter: 'blur(10px)', transition: TRANSITION.quick }}
		onClick={handleClose}
		className={classnames(className, styles.overlay)}
		{...rest}
	/>
);

Portal.Overlay = Overlay;

export type UsePortalConfig = UseDisclosureConfig;

const usePortal = ({
	closeOnClickOutside = true,
	initialOpen,
	onClose,
	onOpen,
	ref,
}: {
	closeOnClickOutside?: boolean;
	ref?: React.Ref<HTMLDivElement>;
} & UsePortalConfig = {}) => {
	const { isOpen, handleClose, handleOpen, handleToggle } = useDisclosure({
		initialOpen,
		onClose,
		onOpen,
	});

	const handleCloseOnClickOutside = useCallback(() => {
		if (!isOpen || !closeOnClickOutside) return;

		handleClose();
	}, [closeOnClickOutside, isOpen]);

	const portalRef = useOnClickOutside<HTMLDivElement>(
		handleCloseOnClickOutside,
		isOpen && closeOnClickOutside,
	);

	useKeyPressEffect('Escape', handleClose, { deps: [handleClose] });

	return {
		handleOpen,
		handleClose,
		handleToggle,
		portalRef: ref || portalRef,
		isOpen,
	};
};

Portal.usePortal = usePortal;

export type UsePortalReturn = ReturnType<typeof usePortal>;
