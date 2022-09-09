import classNames from 'classnames';
import React, { ReactNode } from 'react';

import { isReactNode } from '@noa/utils-common';

import { SimpleText } from '@apps/web/src/components/simpletext/simpletext';

import styles from './block-title.module.scss';

export type BlockTitleProps = {
	title?: ReactNode;
	subtitle?: Sanity.Schema.SimpleText | ReactNode;
	children?: ReactNode;
	className?: string;
};

export const BlockTitle = ({ title, subtitle, className, children }: BlockTitleProps) => {
	return (
		<div className={classNames(styles.div, className)}>
			{title && <h3 className={styles.title}>{title}</h3>}
			{subtitle && (
				<div className={styles.subtitle}>
					{isReactNode(subtitle, true) ? subtitle : <SimpleText textBlocks={subtitle} />}
				</div>
			)}
			{children}
		</div>
	);
};
