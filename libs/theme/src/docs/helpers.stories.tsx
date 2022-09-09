import { action } from '@storybook/addon-actions';
import classNames from 'classnames';
import React from 'react';

import styles from './helpers.stories.module.scss';

export const StoryGroup = ({
	title,
	children,
	className,
	...rest
}: {
	title?: string;
	children?: React.ReactNode;
	className?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => (
	<section className={classNames(styles.group, className)} data-group {...rest}>
		<h2 className={styles.groupTitle}>{title}</h2>
		{children}
	</section>
);

StoryGroup.subTitle = ({
	title,
	className,
	...rest
}: {
	title: string;
	className?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
	<h3 className={classNames(styles.subTitle, className)} data-subtitle {...rest}>
		{title}
	</h3>
);

StoryGroup.subGroup = ({
	title,
	children,
	className,
	asGrid,
	...rest
}: {
	title: string;
	children?: React.ReactNode;
	className?: string;
	asGrid?: boolean;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => (
	<section className={classNames(styles.subGroup, className)} data-as-grid={asGrid} data-subgroup {...rest}>
		<h4 className={styles.subGroupTitle}>{title}</h4>
		{children}
	</section>
);

StoryGroup.itemTitle = ({
	title,
	className,
	children,
	...rest
}: { title: string } & React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) => (
	<button
		className={classNames(styles.itemTitle, className)}
		onClick={() => copyToClipboard(title)}
		data-itemtitle
		{...rest}
	>
		{title}
		{children}
	</button>
);

StoryGroup.itemValue = ({
	title,
	className,
	...rest
}: { title: string } & React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLParagraphElement>,
	HTMLParagraphElement
>) => (
	<p className={classNames(styles.itemValue, className)} data-itemvalue {...rest}>
		{title}
	</p>
);

StoryGroup.square = ({
	background,
	className,
	...rest
}: { background: string } & React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) => {
	return (
		<button
			style={{ background: `var(${background})` }}
			className={classNames(styles.square, className)}
			onClick={() => copyToClipboard(background)}
			data-square
			{...rest}
		/>
	);
};

const copyToClipboard = async (input: string) => {
	await navigator.clipboard.writeText(input);
	action('Copied to clipboard')(input);
	console.info(`Copied to clipboard: "${input}"`);
};
