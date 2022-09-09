import classnames from 'classnames';
import { isString, omit } from 'lodash';
import Link, { LinkProps } from 'next/link';
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react';
import { ExtractStrict, OmitStrict } from 'type-zoo';

import { getVariantsClassNames, Theme } from '@noa/theme';
import { ExtendableForwardRef } from '@noa/utils-common';

import { Icon, IconProps } from '../../icon';

import styles from './button.module.scss';

const getVariants = getVariantsClassNames(styles);

const BUTTON_ICON_SIZE: Record<NonNullable<ButtonBaseProps['size']>, IconProps['size']> = {
	xsmall: 12,
	small: 12,
	medium: 12,
	large: 16,
};

type ButtonBaseProps = {
	children?: React.ReactNode;
	size?: ExtractStrict<Theme['size'], 'xsmall' | 'small' | 'medium' | 'large'>;
	isLoading?: boolean;
	variant?: 'plain' | 'inline' | 'stroke-secondary' | 'stroke-primary' | 'fill-secondary' | 'fill-primary';
	icon?: IconProps & { position?: Theme['position']['order']; spaceBetween?: number };
	/**
	 * Unstyled removes all `button` styling and adds "reset" styling
	 * to make the `button` and `a` tags look identical (padding, margin, appearance, etc.)
	 * This is useful if you want the logic of the `button` but not the styling.
	 */
	unstyled?: boolean;
	/**
	 * Internal use for `Link` component.
	 * This is being controled by the `href` attribute and then chose the semantic correct HTML tag
	 */
	tag?: ExtractStrict<keyof JSX.IntrinsicElements, 'a' | 'button'>;
} & ButtonHTMLAttributes<HTMLButtonElement> &
	AnchorHTMLAttributes<HTMLAnchorElement>;

const ButtonBase = forwardRef(
	(
		{
			variant = 'fill-secondary',
			size = 'medium',
			className,
			children,
			icon,
			isLoading,
			unstyled,
			tag = 'button',
			...rest
		}: ButtonBaseProps,
		ref,
	) => {
		const variantClassName = getVariants('variant', variant);
		const sizeClassName = getVariants('size', size);
		const iconPositionClassName = getVariants('iconPosition', icon?.position);
		const iconOnly = icon && !children;
		const Component = tag as 'button';

		return (
			<Component
				className={
					unstyled === true
						? classnames(styles.unstyled, styles.button, iconPositionClassName, className)
						: classnames(variantClassName, sizeClassName, iconPositionClassName, styles.button, className, {
								[styles.iconOnly]: iconOnly,
								[styles.isLoading]: isLoading,
						  })
				}
				style={
					{
						...(icon?.spaceBetween ? { '--icon-space': `${icon.spaceBetween}px` } : {}),
					} as React.CSSProperties
				}
				ref={ref as React.ForwardedRef<HTMLButtonElement>}
				data-button
				{...rest}
			>
				{children}
				{icon?.icon && (
					<Icon
						{...omit(icon, 'spaceBetween')}
						className={classnames(styles.icon, icon.className)}
						size={icon.size || BUTTON_ICON_SIZE[size]}
					/>
				)}
			</Component>
		);
	},
);

export type ButtonProps = OmitStrict<ButtonBaseProps, 'tag'> &
	Partial<LinkProps> & { forceExternal?: boolean };

export const Button: ExtendableForwardRef<
	Omit<ButtonProps, 'ref'>,
	{ icons?: Record<'arrow-right', ButtonProps['icon']> }
> = forwardRef((_props, ref) => {
	const { forceExternal, as, replace, scroll, shallow, passHref, prefetch, locale, href, ...props } = _props;

	if (href) {
		const external = forceExternal ?? isString(href) ? href?.includes('http') : false;

		return (
			<Link
				as={as}
				href={href}
				replace={replace}
				scroll={scroll}
				shallow={shallow}
				passHref={passHref}
				prefetch={prefetch}
				locale={locale}
			>
				<ButtonBase
					tag="a"
					href={href}
					ref={ref}
					{...(external && {
						target: '_blank',
						icon: { icon: 'external', position: 'after', size: 18, x: 1 },
					})}
					{...props}
				/>
			</Link>
		);
	}

	return <ButtonBase tag="button" ref={ref} {...props} />;
});

Button.icons = {
	'arrow-right': { icon: 'arrow-right', size: 25, spaceBetween: 13 },
};
