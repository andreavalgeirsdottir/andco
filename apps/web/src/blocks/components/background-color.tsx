import classNames from 'classnames';
import { ReactNode } from 'react';

import { getVariantsClassNames } from '@noa/theme';

import styles from './background-color.module.scss';

const getVariant = getVariantsClassNames(styles);

export type BackgroundColorProps = {
	backgroundColor: Sanity.Schema.BackgroundColorObject | undefined;
	tag?: keyof JSX.IntrinsicElements;
	children: ReactNode;
	className?: string;
	id?: string;
};

export const BackgroundColor = ({
	backgroundColor,
	children,
	tag = 'div',
	className,
	id,
	...rest
}: BackgroundColorProps) => {
	const Component = tag as 'div';
	const backgroundColorClassName = getClassName(backgroundColor?.color);

	return (
		<Component
			data-color={backgroundColor?.color}
			className={classNames(styles.container, className, backgroundColorClassName)}
			id={id}
			{...rest}
		>
			{children}
		</Component>
	);
};

const getClassName = (backgroundColor: Sanity.Schema.BackgroundColorObject['color'] | undefined) =>
	getVariant('background-color', backgroundColor || 'none');

BackgroundColor.getClassName = getClassName;
