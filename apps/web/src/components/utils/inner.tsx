import classNames from 'classnames';
import React from 'react';

import { InnerWidth } from '@noa/studio-blocks';
import { getVariantsClassNames } from '@noa/theme';

import { Padding, PaddingProps } from '@apps/web/src/components/utils/padding';

import styles from './inner.module.scss';

const getVariants = getVariantsClassNames(styles);

export type InnerProps = {
	size?: InnerWidth;
	className?: string;
	children: React.ReactNode;
	paddingConfig?: Pick<PaddingProps, 'size'>;
	tag?: keyof JSX.IntrinsicElements;
	inner?: boolean;
	id?: string;
	noHorizontalPadding?: boolean;
	noVerticalPadding?: boolean;
};

export const Inner = ({
	children,
	size = 'large',
	className,
	paddingConfig,
	noHorizontalPadding,
	tag = 'div',
	id,
	noVerticalPadding,
	inner = true,
	...rest
}: InnerProps) => {
	const Component = tag as 'div';
	const sizeClassName = getVariants('size', size);

	const paddingClassName = Padding.usePadding({
		horizontal: !noHorizontalPadding,
		vertical: !noVerticalPadding,
		size: 'huge',
		...paddingConfig,
	});

	return (
		<Component
			className={classNames(sizeClassName, paddingClassName, className, {
				[styles.inner]: inner,
			})}
			id={id}
			{...rest}
		>
			{children}
		</Component>
	);
};

Inner.Padding = Padding;

Inner.styles = styles;
