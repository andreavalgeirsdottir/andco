import classNames from 'classnames';
import React from 'react';
import { ExtractStrict } from 'type-zoo/types';

import { getVariantsClassNames, Theme } from '@noa/theme';

import styles from './padding.module.scss';

const getVariants = getVariantsClassNames(styles);

export type PaddingProps = {
	className?: string;
	children?: React.ReactNode;
} & UsePaddingConfig;

export const Padding = ({ horizontal, vertical, children, className, size }: PaddingProps) => {
	const paddingClassName = Padding.usePadding({ horizontal, vertical, size });

	return <div className={classNames(paddingClassName, className)}>{children}</div>;
};

export type UsePaddingConfig = {
	size?: ExtractStrict<Theme['size'], 'small' | 'medium' | 'large' | 'xlarge' | 'huge'>;
	horizontal?: boolean;
	vertical?: boolean;
};

const usePadding = ({ size = 'large', horizontal = true, vertical = true }: UsePaddingConfig) => {
	const sizeClassName = getVariants('size', size);

	return classNames(styles.padding, sizeClassName, {
		[styles['padding-vertical']]: vertical,
		[styles['padding-horizontal']]: horizontal,
	});
};

Padding.usePadding = usePadding;

Padding.styles = styles;
