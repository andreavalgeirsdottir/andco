import cn from 'classnames';
import React from 'react';
import { OmitStrict } from 'type-zoo/types';

import { getVariantsClassNames } from '@noa/theme';

import { Inner, InnerProps } from '@apps/web/src/components/utils/inner';

import styles from './inner-split.module.scss';

const getVariants = getVariantsClassNames(styles);

export type InnerSplitProps = {
	left: React.ReactNode;
	right: React.ReactNode;
	inner?: OmitStrict<InnerProps, 'className'>;
	backgroundColor?: Sanity.Schema.BackgroundColorObject['color'];
	className?: string;
	id?: string;
	classNames?: Partial<Record<'left' | 'right', string>>;
	reversed?: boolean;
};

export const InnerSplit = ({
	left,
	right,
	inner,
	className,
	id,
	classNames,
	backgroundColor,
	reversed,
	...rest
}: InnerSplitProps) => {
	const backgroundColorClassName = getVariants('background-color', backgroundColor);

	return (
		<Inner
			className={cn(styles.inner, className, backgroundColorClassName, {
				[styles.hasBackgroundColor]: !!backgroundColor,
				[styles.reversed]: !!reversed,
			})}
			tag="section"
			id={id}
			{...rest}
			{...inner}
		>
			{left && (
				<div className={cn(styles.left, classNames?.left)} data-left data-color={backgroundColor}>
					{left}
				</div>
			)}
			{right && (
				<div className={cn(styles.right, classNames?.right)} data-right>
					{right}
				</div>
			)}
		</Inner>
	);
};
