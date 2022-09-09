import classNames from 'classnames';
import React from 'react';

import { getVariantsClassNames } from '@noa/theme';

import styles from './fieldset.module.scss';

const getVariants = getVariantsClassNames(styles);

export type FieldsetProps = {
	children: React.ReactNode;
	className?: string;
};

/**
 * Fieldset component
 *
 * Fieldset is a wrapper for a group of form elements, to make sure they have the correct spacing.
 *
 * @version 1.0.0
 */
export const Fieldset = ({ children, className }: FieldsetProps) => {
	return <fieldset className={classNames(styles.fieldset, className)}>{children}</fieldset>;
};

const Row = ({
	children,
	fullWidth,
	center,
	className,
}: {
	children: React.ReactNode;
	fullWidth?: boolean;
	center?: boolean;
	className?: string;
}) => (
	<div
		className={classNames(styles.row, className, {
			[styles.fullWidth]: fullWidth,
			[styles.center]: center,
		})}
	>
		{children}
	</div>
);

Fieldset.Row = Row;

const Center = ({
	children,
	className,
	direction = 'row',
	gap = 'small',
}: {
	children: React.ReactNode;
	className?: string;
	direction?: 'row' | 'column';
	gap?: 'small';
}) => {
	const directionClassName = getVariants('direction', direction);
	const gapClassName = getVariants('gap', gap);

	return (
		<div className={classNames(styles.center, className, directionClassName, gapClassName)}>{children}</div>
	);
};

Fieldset.Center = Center;
