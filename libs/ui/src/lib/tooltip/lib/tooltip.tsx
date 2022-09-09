import { TooltipPopup, useTooltip } from '@reach/tooltip';
import classNames from 'classnames';
import React from 'react';
import { Param0 } from 'type-zoo/types';

import './tooltip.scss';
import styles from './tooltip.module.scss';

export type TooltipProps = {
	children: React.ReactNode;
	label: React.ReactNode;
	className?: string;
};

export const Tooltip = ({ children, label, className }: TooltipProps) => {
	return (
		<TooltipBase label={label} className={classNames(className, styles.tooltip)}>
			{children}
		</TooltipBase>
	);
};

Tooltip.useTooltip = useTooltip;

const TooltipBase = ({ children, label, className, ...rest }: Param0<typeof Tooltip>) => {
	const [trigger, tooltip] = Tooltip.useTooltip();

	return (
		<React.Fragment>
			{children && Array.isArray(children) ? (
				<>{children.map((child) => React.cloneElement(child as React.ReactElement, trigger))}</>
			) : (
				React.cloneElement(children as React.ReactElement, trigger)
			)}
			<TooltipPopup
				{...tooltip}
				label={label}
				data-visible={tooltip.isVisible}
				className={classNames(styles.popup, className)}
				{...rest}
			/>
		</React.Fragment>
	);
};
