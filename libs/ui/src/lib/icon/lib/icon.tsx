import classNames from 'classnames';
import isObject from 'lodash/isObject';
import React from 'react';

import { getStringFromCSSTransform } from '@noa/theme';

import { Icons, icons } from '../icons';

import styles from './icon.module.scss';

export type IconProps = {
	/**
	 * @returns rotate({x}deg)
	 */
	rotate?: number;
	/**
	 * @returns scale({x})
	 */
	scale?: number;
	/**
	 * @returns translateX({x})
	 */
	x?: number;
	/**
	 * @returns translateY({x})
	 */
	y?: number;
	/**
	 * @returns
	 */
	size?: number | { width: number; height: number };
	color?: string;
	icon: Icons;
	className?: string;
	style?: React.CSSProperties;
};

export const Icon = ({
	icon,
	x,
	y,
	rotate,
	scale,
	className,
	color,
	size = 16,
	style,
	...rest
}: IconProps) => {
	const Component = icon ? icons[icon] : undefined;

	if (icon && !icons[icon]) {
		console.warn(`Icon "${icon}" not found`);
		return null;
	}

	const collectedStyles = {
		...style,
		'--icon-color': color,
		transform: getStringFromCSSTransform({
			scale,
			rotate,
			translateX: x ? `${x}px` : undefined,
			translateY: y ? `${y}px` : undefined,
		}),
		...(isObject(size) ? { width: size.width, height: size.height } : { width: size, height: size }),
	} as React.CSSProperties;

	return (
		<Component
			data-icon={icon}
			className={classNames(styles.icon, className)}
			style={collectedStyles}
			{...rest}
		/>
	);
};
